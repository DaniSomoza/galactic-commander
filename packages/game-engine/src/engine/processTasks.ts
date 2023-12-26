import { MongoServerError } from 'mongodb'

import groupTasksBySeconds from '../helpers/groupTasksBySeconds'
import {
  ERROR_TASK_STATUS,
  ITaskDocument,
  ITaskTypeDocument,
  NEW_PLAYER_TASK_TYPE,
  NewPlayerTaskType,
  PROCESSED_TASK_STATUS,
  TaskType
} from '../models/TaskModel'
import { IUniverseDocument } from '../models/UniverseModel'
import GameEngineError from './errors/GameEngineError'
import { TASK_HANDLER, TaskHandler } from './tasks/taskHandlers'

async function processTasks(tasks: ITaskDocument[], universe: IUniverseDocument) {
  const tasksGroupedBySeconds = groupTasksBySeconds(tasks, universe)

  for (const { tasks, second } of tasksGroupedBySeconds) {
    // 0.- Calculate player resources
    // TODO: for each second Calculate resource Production for each player

    // 1.- New player Tasks
    const newPlayerTasks = tasks.filter((task) => task.type === NEW_PLAYER_TASK_TYPE)

    const newPlayerTaskHandler = TASK_HANDLER[NEW_PLAYER_TASK_TYPE].handler

    await processTasksSequentially(
      newPlayerTasks as ITaskTypeDocument<NewPlayerTaskType>[],
      newPlayerTaskHandler,
      second
    )

    // 2.- Research Tasks
    // TODO: implement this

    universe.lastProcessedTime = second
    await universe.save()
  }
}

export default processTasks

async function processTasksSequentially<Type extends TaskType>(
  tasks: ITaskTypeDocument<Type>[],
  handler: TaskHandler<Type>,
  second: number
) {
  for (const task of tasks) {
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
    task.save()
  }
}

// async function processTasksInParallel<Type extends TaskType>(
//   tasks: ITaskTypeDocument<Type>[],
//   handler: TaskHandler<Type>,
//   second: number
// ) {
// TODO: processingDuration
//   return Promise.all(tasks.map((task) => handler(task, second)))
// }
