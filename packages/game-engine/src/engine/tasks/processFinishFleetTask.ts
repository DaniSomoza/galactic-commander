import FleetModel from '../../models/FleetModel'
import { ITaskTypeDocument } from '../../models/TaskModel'
import planetRepository from '../../repositories/planetRepository'
import playerRepository from '../../repositories/playerRepository'
import { IFleetUnits } from '../../types/IFleet'
import { IPlanet } from '../../types/IPlanet'
import { FinishFleetTaskType } from '../../types/ITask'
import GameEngineError from '../errors/GameEngineError'

async function processFinishFleetTask(
  task: ITaskTypeDocument<FinishFleetTaskType>,
  second: number
) {
  // get all the required data from DB
  const player = await playerRepository.findPlayerById(task.data.playerId)
  const fromPlanet = await planetRepository.findPlanetById(task.data.from)
  const toPlanet = await planetRepository.findPlanetById(task.data.to)

  if (!player) {
    throw new GameEngineError('invalid player')
  }

  if (!fromPlanet) {
    throw new GameEngineError('invalid from planet')
  }

  if (!toPlanet) {
    throw new GameEngineError('invalid to planet')
  }

  if (toPlanet._id.equals(fromPlanet._id)) {
    throw new GameEngineError('invalid planet')
  }

  // TODO: IMPLEMENT THIS

  if (task.data.fleetType === 'EXPLORE_FLEET_TYPE') {
    // const newFleet = new FleetModel({
    //   planet: fromPlanet,
    //   playerId: player._id,
    //   units: task.data.units,
    //   travel: {
    //     destination: toPlanet,
    //     arriveAt: second + getFleetDuration(fromPlanet, toPlanet, task.data.units),
    //     fleetType: task.data.fleetType,
    //     isReturning: false,
    //     resources: task.data.resources
    //   }
    // })

    // player.fleets.push(newFleet)

    // TODO: create FINISH_FLEET_TASK_TYPE

    fromPlanet.isExplored = true
    const isAlreadyExplored = fromPlanet.exploredBy.some((exploredPlayer) =>
      // TODO: is id[] or player[] ????
      exploredPlayer._id.equals(player._id)
    )
    if (!isAlreadyExplored) {
      fromPlanet.exploredBy.push(player)
    }
    // TODO: create a return fleet!

    return Promise.all([player.save(), fromPlanet.save()])
  }

  throw 'fleet type not implemented'
}

export default processFinishFleetTask
