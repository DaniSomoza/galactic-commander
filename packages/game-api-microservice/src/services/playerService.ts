import {
  ITask,
  NewPlayerTaskType,
  NEW_PLAYER_TASK_TYPE,
  PENDING_TASK_STATUS
} from 'game-engine/dist/models/TaskModel'
import playerRepository from 'game-engine/dist/repositories/playerRepository'
import taskRepository from 'game-engine/dist/repositories/taskRepository'
import raceRepository from 'game-engine/dist/repositories/raceRepository'
import universeRepository from 'game-engine/dist/repositories/universeRepository'
import NotFoundError from 'auth-microservice/dist/errors/NotFoundError'
import ConflictError from 'auth-microservice/dist/errors/ConflictError'

type PlayerData = {
  username: string
  email: string
  isActivated: boolean
  raceName: string
  universeName: string
}

async function createPlayer({
  username,
  email,
  isActivated,
  raceName,
  universeName
}: PlayerData): Promise<ITask<NewPlayerTaskType>> {
  if (!isActivated) {
    throw new ConflictError('user is not activated', { username })
  }

  const raceData = await raceRepository.findRaceByName(raceName)

  if (!raceData) {
    throw new NotFoundError('invalid race', { raceName })
  }

  const universeData = await universeRepository.findUniverseByName(universeName)

  if (!universeData) {
    throw new NotFoundError('invalid universe', { universeName })
  }

  const player = await playerRepository.findPlayerByUsername(username, universeData._id)
  const duplicatedPlayerTask = await taskRepository.findNewPlayerTaskByUsername(
    username,
    universeData._id
  )

  if (player || duplicatedPlayerTask) {
    throw new ConflictError('player already created', { username })
  }

  const newPlayerTask: ITask<NewPlayerTaskType> = {
    type: NEW_PLAYER_TASK_TYPE,
    universe: universeData._id,
    data: {
      username,
      email,
      race: raceData._id
    },

    status: PENDING_TASK_STATUS,
    isCancellable: false,

    executeTaskAt: null,
    processedAt: null,
    processingDuration: null,

    history: [
      {
        taskStatus: PENDING_TASK_STATUS,
        updatedAt: new Date().getTime()
      }
    ],

    errorDetails: null
  }

  const newTask = await taskRepository.createPlayerTask(newPlayerTask)

  return newTask
}

const playerService = {
  createPlayer
}

export default playerService
