import getTaskModel, { ITaskTypeDocument } from '../../models/TaskModel'
import planetRepository from '../../repositories/planetRepository'
import playerRepository from '../../repositories/playerRepository'
import unitRepository from '../../repositories/unitRepository'
import {
  FINISH_FLEET_TASK_TYPE,
  FinishFleetTaskType,
  ITask,
  PENDING_TASK_STATUS
} from '../../types/ITask'
import GameEngineError from '../errors/GameEngineError'
import getFleetDuration from '../fleets/getFleetDuration'

async function processFinishFleetTask(
  task: ITaskTypeDocument<FinishFleetTaskType>,
  second: number
) {
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

  if (task.data.fleetType === 'EXPLORE_FLEET_TYPE') {
    const currentFleet = player.fleets.find(
      (playerFleet) => playerFleet._id.toString() === task.data.fleetId
    )

    if (!currentFleet) {
      throw new GameEngineError('invalid fleet')
    }

    if (task.data.isReturning) {
      const playerUnitsInThePlanet = player.fleets.find(
        (fleet) => fleet.planet._id.equals(fromPlanet._id) && !fleet.travel
      )

      if (!playerUnitsInThePlanet) {
        throw new GameEngineError('invalid units in the planet')
      }

      const units = await unitRepository.findUnits()

      // restore units in the fleet planet
      for (let i = 0; i < task.data.units.length; i++) {
        const fleetUnit = task.data.units[i]

        const planetUnit = playerUnitsInThePlanet.units.find(
          (planetFleet) => planetFleet.unit.name === fleetUnit.unit.name
        )

        if (planetUnit) {
          planetUnit.amount += fleetUnit.amount
        } else {
          const unit = units.find((unit) => unit.name === fleetUnit.unit.name)

          if (!unit) {
            throw new GameEngineError('invalid fleet unit')
          }

          playerUnitsInThePlanet.units.push({
            unit,
            amount: fleetUnit.amount
          })
        }
      }

      player.fleets = player.fleets.filter((fleet) => !fleet._id.equals(currentFleet._id))

      return Promise.all([currentFleet.deleteOne(), playerUnitsInThePlanet.save(), player.save()])
    }

    const executeTaskAt = second + getFleetDuration(toPlanet, fromPlanet, task.data.units, player)

    // create returning fleet
    currentFleet.planet = toPlanet
    currentFleet.travel!.destination = fromPlanet
    currentFleet.travel!.arriveAt = executeTaskAt
    currentFleet.travel!.isReturning = true

    toPlanet.isExplored = true

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
        isReturning: true,
        arriveAt: executeTaskAt,
        fleetId: currentFleet._id.toString()
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

    if (currentFleet.travel) {
      currentFleet.travel.taskId = newTask._id.toString()
    }

    // TODO: create exploration report

    const isAlreadyExplored = toPlanet.exploredBy.some(
      (exploredPlayer) => exploredPlayer === player._id.toString()
    )

    if (!isAlreadyExplored) {
      toPlanet.exploredBy.push(player._id.toString())
    }

    return Promise.all([newTask.save(), currentFleet.save(), player.save(), toPlanet.save()])
  }

  throw 'fleet type not implemented'
}

export default processFinishFleetTask
