import { MongoServerError } from 'mongodb'

import groupTasksBySeconds from '../helpers/groupTasksBySeconds'
import {
  ERROR_TASK_STATUS,
  FINISH_RESEARCH_TASK_TYPE,
  FinishResearchTaskData,
  ITaskDocument,
  ITaskTypeDocument,
  NEW_PLAYER_TASK_TYPE,
  NewPlayerTaskData,
  PROCESSED_TASK_STATUS,
  START_RESEARCH_TASK_TYPE,
  StartResearchTaskData,
  TaskType
} from '../models/TaskModel'
import playerRepository from '../repositories/playerRepository'
import GameEngineError from './errors/GameEngineError'
import { IUniverseDocument } from '../models/UniverseModel'
import { IPlanetDocument } from '../models/PlanetModel'
import { IPlayerDocument } from '../models/PlayerModel'
import calculateResourceProduction from './resources/calculateResourceProduction'
import { TASK_HANDLER, TaskHandler } from './tasks/taskHandlers'
import applyBonus from '../helpers/applyBonus'

async function processTasks(tasks: ITaskDocument[], universe: IUniverseDocument) {
  const tasksGroupedBySeconds = groupTasksBySeconds(tasks, universe)

  for (const { tasks, second } of tasksGroupedBySeconds) {
    // TODO: execute tasks by type

    // TODO: get tasks again ???

    // 0.- Calculate player resources
    await processResourceProduction(tasks, second)

    // 1.- New player Tasks
    const newPlayerTasks = tasks.filter((task) => task.type === NEW_PLAYER_TASK_TYPE)

    const newPlayerTaskHandler = TASK_HANDLER[NEW_PLAYER_TASK_TYPE].handler

    await processTasksSequentially(newPlayerTasks, newPlayerTaskHandler, second)

    // 2.- Finish Research Tasks
    const finishResearchTaskHandler = TASK_HANDLER[FINISH_RESEARCH_TASK_TYPE].handler

    const finishResearchTasks = tasks.filter((task) => task.type === FINISH_RESEARCH_TASK_TYPE)
    await processTasksInParallel(finishResearchTasks, finishResearchTaskHandler, second)

    // 3.- Start Research Tasks
    const startResearchTaskHandler = TASK_HANDLER[START_RESEARCH_TASK_TYPE].handler

    const startResearchTasks = tasks.filter((task) => task.type === START_RESEARCH_TASK_TYPE)
    await processTasksSequentially(startResearchTasks, startResearchTaskHandler, second)

    // update universe
    universe.lastProcessedTime = second
    await universe.save()
  }
}

export default processTasks

// TODO: add tests here
async function processTasksSequentially<Type extends TaskType>(
  tasks: ITaskDocument[],
  handler: TaskHandler<Type>,
  second: number
) {
  for (const task of tasks) {
    await setTaskAsProcessed(task, handler, second)
  }
}

async function processTasksInParallel<Type extends TaskType>(
  tasks: ITaskDocument[],
  handler: TaskHandler<Type>,
  second: number
) {
  return Promise.all(tasks.map((task) => setTaskAsProcessed(task, handler, second)))
}

async function setTaskAsProcessed<Type extends TaskType>(
  task: ITaskDocument,
  handler: TaskHandler<Type>,
  second: number
) {
  const startTime = new Date().getTime()
  try {
    await handler(task as ITaskTypeDocument<Type>, second)
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

async function processResourceProduction(
  tasks: ITaskTypeDocument<TaskType>[],
  second: number
): Promise<IPlanetDocument[]> {
  const planets: {
    planet: IPlanetDocument
    owner: IPlayerDocument
  }[] = []

  // TODO: implement targetPlanet feature
  for (const task of tasks) {
    // calculate all player planet production
    if (isPlayerTaskData(task.data)) {
      const player = await playerRepository.findPlayerById(task.data.player)

      if (player) {
        const playerPlanets = player.planets.colonies

        playerPlanets.forEach((playerPlanet) => {
          const isAlreadyIncluded = planets.some(({ planet }) =>
            planet._id.equals(playerPlanet._id)
          )

          if (!isAlreadyIncluded) {
            planets.push({
              planet: playerPlanet,
              owner: player
            })
          }
        })
      }
    }
  }

  return Promise.all(
    planets.map(({ planet, owner }) => {
      const ownerResourceProductionBonus = applyBonus(owner.bonus, 'resourceProductionBonus', true)

      planet.resources = calculateResourceProduction(
        second,
        planet.resources,
        planet.lastResourceProductionTime,
        planet.resourceQuality,
        ownerResourceProductionBonus
      )
      planet.lastResourceProductionTime = second

      return planet.save()
    })
  )
}

function isPlayerTaskData(
  taskData: NewPlayerTaskData | StartResearchTaskData | FinishResearchTaskData
): taskData is StartResearchTaskData | FinishResearchTaskData {
  return 'player' in taskData
}
