import { MongoServerError } from 'mongodb'

import groupTasksBySeconds from '../helpers/groupTasksBySeconds'
import {
  ERROR_TASK_STATUS,
  FINISH_RESEARCH_TASK_TYPE,
  FinishResearchTaskType,
  ITaskDocument,
  ITaskTypeDocument,
  NEW_PLAYER_TASK_TYPE,
  NewPlayerTaskType,
  PROCESSED_TASK_STATUS,
  START_RESEARCH_TASK_TYPE,
  StartResearchTaskType,
  TaskType
} from '../models/TaskModel'
import { IUniverseDocument } from '../models/UniverseModel'
import GameEngineError from './errors/GameEngineError'
import { TASK_HANDLER, TaskHandler } from './tasks/taskHandlers'
import calculateResourceProduction from './resources/calculateResourceProduction'

async function processTasks(tasks: ITaskDocument[], universe: IUniverseDocument) {
  const tasksGroupedBySeconds = groupTasksBySeconds(tasks, universe)

  for (const { tasks, second } of tasksGroupedBySeconds) {
    // 0.- Calculate player resources
    await calculateResourceProduction(tasks, second)

    // 1.- New player Tasks
    const newPlayerTasks = tasks.filter((task) => task.type === NEW_PLAYER_TASK_TYPE)

    const newPlayerTaskHandler = TASK_HANDLER[NEW_PLAYER_TASK_TYPE].handler

    await processTasksSequentially(
      newPlayerTasks as ITaskTypeDocument<NewPlayerTaskType>[],
      newPlayerTaskHandler,
      second
    )

    // 2.- Finish Research Tasks
    const finishResearchTaskHandler = TASK_HANDLER[FINISH_RESEARCH_TASK_TYPE].handler

    const finishResearchTasks = tasks.filter((task) => task.type === FINISH_RESEARCH_TASK_TYPE)
    await processTasksInParallel(
      finishResearchTasks as ITaskTypeDocument<FinishResearchTaskType>[],
      finishResearchTaskHandler,
      second
    )

    // 3.- Start Research Tasks
    const startResearchTaskHandler = TASK_HANDLER[START_RESEARCH_TASK_TYPE].handler

    const startResearchTasks = tasks.filter((task) => task.type === START_RESEARCH_TASK_TYPE)
    await processTasksSequentially(
      startResearchTasks as ITaskTypeDocument<StartResearchTaskType>[],
      startResearchTaskHandler,
      second
    )

    // update universe
    universe.lastProcessedTime = second
    await universe.save()
  }
}

export default processTasks

// TODO: add tests here
async function processTasksSequentially<Type extends TaskType>(
  tasks: ITaskTypeDocument<Type>[],
  handler: TaskHandler<Type>,
  second: number
) {
  for (const task of tasks) {
    await setTaskAsProcessed(task, handler, second)
  }
}

async function processTasksInParallel<Type extends TaskType>(
  tasks: ITaskTypeDocument<Type>[],
  handler: TaskHandler<Type>,
  second: number
) {
  return Promise.all(tasks.map((task) => setTaskAsProcessed(task, handler, second)))
}

async function setTaskAsProcessed<Type extends TaskType>(
  task: ITaskTypeDocument<Type>,
  handler: TaskHandler<Type>,
  second: number
) {
  const startTime = new Date().getTime()
  try {
    await handler(task, second)
    task.status = PROCESSED_TASK_STATUS
    task.history.push({ taskStatus: PROCESSED_TASK_STATUS, updatedAt: new Date().getTime() })
  } catch (error) {
    if (error instanceof MongoServerError) {
      task.errorDetails = error.message
    }
    if (error instanceof GameEngineError) {
      task.errorDetails = error.message
    }

    task.status = ERROR_TASK_STATUS
    task.history.push({ taskStatus: ERROR_TASK_STATUS, updatedAt: new Date().getTime() })
  }

  task.isCancellable = false
  task.processedAt = second
  const endTime = new Date().getTime()
  task.processingDuration = endTime - startTime
  return task.save()
}
