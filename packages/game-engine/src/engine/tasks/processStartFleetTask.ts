import { ITaskTypeDocument } from '../../models/TaskModel'
import planetRepository from '../../repositories/planetRepository'
import playerRepository from '../../repositories/playerRepository'
import { StartFleetTaskType } from '../../types/ITask'
import GameEngineError from '../errors/GameEngineError'

async function processStartFleetTask(task: ITaskTypeDocument<StartFleetTaskType>, second: number) {
  // get all the required data from DB
  const player = await playerRepository.findPlayerById(task.data.playerId)
  const planet = await planetRepository.findPlanetById(task.data.planetId)

  if (!player) {
    throw new GameEngineError('invalid player')
  }

  return Promise.all([task.save()])
}

export default processStartFleetTask
