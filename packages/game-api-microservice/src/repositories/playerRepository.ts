import PlayerModel from 'game-engine/dist/models/PlayerModel'
import RaceModel from 'game-engine/dist/models/RaceModel'
import getTaskModel, { ITask, NewPlayerTaskType } from 'game-engine/dist/models/TaskModel'

// TODO: move this File to game-engine

async function createPlayerTask(taskData: ITask<NewPlayerTaskType>) {
  const NewPlayerTaskModel = getTaskModel<NewPlayerTaskType>()
  const newPlayerTask = new NewPlayerTaskModel(taskData)
  return newPlayerTask.save()
}

async function findPlayerByUsername(username: string) {
  return PlayerModel.findOne({ username }).lean().exec()
}

async function findRaceById(raceId: string) {
  return RaceModel.findById(raceId).lean().exec()
}

const playerRepository = {
  createPlayerTask,
  findPlayerByUsername,
  findRaceById
}

export default playerRepository
