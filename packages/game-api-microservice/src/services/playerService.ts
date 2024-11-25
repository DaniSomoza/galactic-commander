import playerRepository from 'game-engine/dist/repositories/playerRepository'
import taskRepository from 'game-engine/dist/repositories/taskRepository'
import raceRepository from 'game-engine/dist/repositories/raceRepository'
import universeRepository from 'game-engine/dist/repositories/universeRepository'
import { ITask } from 'game-engine/dist/types/ITask'
import NotFoundError from 'auth-microservice/dist/errors/NotFoundError'
import ConflictError from 'auth-microservice/dist/errors/ConflictError'

import { PlayerData, createPlayerResponseType, getPlayerResponseType } from '../types/Player'
import { NewPlayerTaskType, NEW_PLAYER_TASK_TYPE, PENDING_TASK_STATUS } from '../types/Task'
import cleanTaskFields from '../utils/cleanTaskFields'
import cleanPlayerFields from '../utils/cleanPlayerFields'

async function createPlayer({
  username,
  email,
  isActivated,
  raceName,
  universeName
}: PlayerData): Promise<createPlayerResponseType> {
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

  const task = await taskRepository.createPlayerTask(newPlayerTask)

  return { task: cleanTaskFields(task) }
}

async function getPlayer(username: string, universeName: string): Promise<getPlayerResponseType> {
  const universeData = await universeRepository.findUniverseByName(universeName)

  if (!universeData) {
    throw new NotFoundError('invalid universe', { universeName })
  }

  const player = await playerRepository.findPlayerByUsername(username, universeData._id)

  if (!player) {
    // TODO: create enum or const for the errors NO_PLAYER_FOUND_ERROR
    throw new NotFoundError('no player present in this universe', { username, universeName })
  }

  // TODO: add future pending tasks to tack them in the frontend

  return { player: cleanPlayerFields(player) }
}

const playerService = {
  createPlayer,
  getPlayer
}

export default playerService
