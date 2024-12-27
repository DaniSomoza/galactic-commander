import getSecond from '../../helpers/getSecond'
import FleetModel from '../../models/FleetModel'
import getTaskModel, { ITaskTypeDocument } from '../../models/TaskModel'
import planetRepository from '../../repositories/planetRepository'
import playerRepository from '../../repositories/playerRepository'
import {
  FINISH_FLEET_TASK_TYPE,
  FinishFleetTaskType,
  ITask,
  PENDING_TASK_STATUS,
  StartFleetTaskType
} from '../../types/ITask'
import GameEngineError from '../errors/GameEngineError'
import getAmountOfTroops from '../fleets/getAmountOfTroops'
import getFleetDuration from '../fleets/getFleetDuration'
import getFleetResourceCapacity from '../fleets/getFleetResourceCapacity'
import getFleetTroopsCapacity from '../fleets/getFleetTroopsCapacity'

async function processStartFleetTask(task: ITaskTypeDocument<StartFleetTaskType>, second: number) {
  // get all the required data from DB
  const player = await playerRepository.findPlayerById(task.data.playerId)
  const fromPlanet = await planetRepository.findPlanetById(task.data.fromPlanetId)
  const toPlanet = await planetRepository.findPlanetById(task.data.toPlanetId)

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

  // TODO: check number of active player fleets

  const playerUnitsInThePlanet = player.fleets.find(
    (fleet) => fleet.planet._id.equals(fromPlanet._id) && !fleet.travel
  )

  if (!playerUnitsInThePlanet) {
    throw new GameEngineError('invalid units in the planet')
  }

  // units present in the planet and no defenses present
  const isInvalidUnits = playerUnitsInThePlanet.units.some((planetUnit) => {
    const fleetUnit = task.data.units.find(
      (fleetUnit) => fleetUnit.unit.name === planetUnit.unit.name
    )

    return !fleetUnit || fleetUnit.amount > planetUnit.amount || fleetUnit.unit.type === 'DEFENSE'
  })

  if (isInvalidUnits) {
    throw new GameEngineError('invalid units in the planet')
  }

  // check troops capacity
  const troopsCapacity = getFleetTroopsCapacity(task.data.units)
  const amountOfTroops = getAmountOfTroops(task.data.units)

  if (amountOfTroops > troopsCapacity) {
    throw new GameEngineError('invalid amount of troops in the fleet')
  }

  // check resources
  if (task.data.resources > fromPlanet.resources) {
    throw new GameEngineError('invalid resources')
  }

  const fleetResourceCapacity = getFleetResourceCapacity(task.data.units)

  if (task.data.resources > fleetResourceCapacity) {
    throw new GameEngineError('invalid fleet resources capacity')
  }

  if (task.data.fleetType === 'EXPLORE_FLEET_TYPE') {
    const executeTaskAt = getSecond(
      second + getFleetDuration(fromPlanet, toPlanet, task.data.units, player)
    )

    task.data.units.forEach((fleetUnit) => {
      const planetUnit = playerUnitsInThePlanet.units.find(
        ({ unit }) => unit.name === fleetUnit.unit.name
      )

      planetUnit!.amount -= fleetUnit.amount
    })

    const newFleet = new FleetModel({
      planet: fromPlanet,
      playerId: player._id,
      units: task.data.units,
      travel: {
        destination: toPlanet,
        arriveAt: executeTaskAt,
        fleetType: task.data.fleetType,
        isReturning: false,
        resources: task.data.resources
      }
    })

    player.fleets.push(newFleet)

    // TODO: implement createBaseTask helper function
    const finishBuildUnitsTask: ITask<FinishFleetTaskType> = {
      type: FINISH_FLEET_TASK_TYPE,
      universeId: player.universeId,
      data: {
        playerId: player._id.toString(),
        fromPlanetId: fromPlanet._id.toString(),
        toPlanetId: toPlanet._id.toString(),
        units: task.data.units,
        resources: task.data.resources,
        fleetType: task.data.fleetType,
        allUnitsInThePlanet: task.data.allUnitsInThePlanet,
        allResourcesInThePlanet: task.data.allResourcesInThePlanet,
        isReturning: false,
        arriveAt: executeTaskAt,
        fleetId: newFleet._id.toString()
      },
      status: PENDING_TASK_STATUS,
      isCancellable: true,
      executeTaskAt,
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
    const taskModel = getTaskModel<FinishFleetTaskType>()
    const newTask = new taskModel(finishBuildUnitsTask)

    return Promise.all([
      newTask.save(),
      player.save(),
      playerUnitsInThePlanet.save(),
      newFleet.save(),
      fromPlanet.save()
    ])
  }

  throw 'fleet type not implemented'
}

export default processStartFleetTask
