import {
  ITask,
  NewPlayerTaskType,
  NEW_PLAYER_TASK_TYPE,
  PENDING_TASK_STATUS
} from 'game-engine/dist/models/TaskModel'

import playerRepository from '../repositories/playerRepository'

type PlayerData = {
  username: string
  email: string
  race: string
}

async function createPlayer({
  username,
  email,
  race
}: PlayerData): Promise<ITask<NewPlayerTaskType>> {
  const raceData = await playerRepository.findRaceById(race)

  if (!raceData) {
    // TODO: ERROR no race exists
    throw new Error('ERROR')
  }

  const NewPlayerTask: ITask<NewPlayerTaskType> = {
    type: NEW_PLAYER_TASK_TYPE,
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

    history: [],

    errorDetails: null
  }

  const newTask = await playerRepository.createPlayerTask(NewPlayerTask)

  return newTask
}

const playerService = {
  createPlayer
}

export default playerService
