import FleetModel, { IFleetDocument } from '../../models/FleetModel'
import { IPlanetDocument } from '../../models/PlanetModel'
import { IPlayerDocument } from '../../models/PlayerModel'
import PlayerUnitsModel from '../../models/PlayerUnitsModel'
import getTaskModel, { ITaskTypeDocument } from '../../models/TaskModel'
import fleetRepository from '../../repositories/fleetRepository'
import planetRepository from '../../repositories/planetRepository'
import playerRepository from '../../repositories/playerRepository'
import playerUnitsRepository from '../../repositories/playerUnitsRepository'
import unitRepository from '../../repositories/unitRepository'
import {
  FINISH_FLEET_TASK_TYPE,
  FinishFleetTaskType,
  ITask,
  PENDING_TASK_STATUS
} from '../../types/ITask'
import GameEngineError from '../errors/GameEngineError'

async function processFinishFleetTask(
  task: ITaskTypeDocument<FinishFleetTaskType>,
  second: number
) {
  // TODO: USE PROMISE ALL ???
  // get all the required data from DB
  const player = await playerRepository.findPlayerById(task.data.playerId)
  const fromPlanet = await planetRepository.findPlanetById(task.data.fromPlanetId)
  const toPlanet = await planetRepository.findPlanetById(task.data.toPlanetId)
  const fleet = await fleetRepository.findFleetById(task.data.fleetId)

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

  if (!fleet) {
    throw new GameEngineError('invalid fleet')
  }

  if (task.data.isReturning) {
    return processReturningFleetTask({
      fleet,
      player,
      toPlanet,
      taskData: task.data
    })
  }

  if (task.data.fleetType === 'EXPLORE_FLEET_TYPE') {
    return processFinishExploreFleetTask({
      fleet,
      player,
      fromPlanet,
      toPlanet,
      taskData: task.data,
      second
    })
  }

  throw 'fleet type not implemented'
}

export default processFinishFleetTask

type ReturningFleetType = {
  fleet: IFleetDocument
  player: IPlayerDocument
  toPlanet: IPlanetDocument
  taskData: ITask<'FINISH_FLEET_UNITS_TASK'>['data']
}

async function processReturningFleetTask({
  fleet,
  player,
  toPlanet,
  taskData
}: ReturningFleetType) {
  const playerUnitsInThePlanet = await playerUnitsRepository.findPlayerUnitsInThePlanet(
    player._id.toString(),
    toPlanet._id.toString()
  )

  const unitsInThePlanet =
    playerUnitsInThePlanet ||
    new PlayerUnitsModel({
      planet: toPlanet,
      player,
      units: []
    })

  const units = await unitRepository.findUnits()

  // restore units in the fleet planet
  for (let i = 0; i < taskData.units.length; i++) {
    const fleetUnit = taskData.units[i]

    const planetUnit = unitsInThePlanet.units.find(({ unit }) => unit.name === fleetUnit.unit.name)

    if (planetUnit) {
      planetUnit.amount += fleetUnit.amount
    } else {
      const unit = units.find((unit) => unit.name === fleetUnit.unit.name)

      if (!unit) {
        throw new GameEngineError('invalid fleet unit')
      }

      unitsInThePlanet.units.push({
        unit,
        amount: fleetUnit.amount
      })
    }
  }

  // planet resources
  toPlanet.resources += fleet.resources

  fleet.isFinished = true

  return Promise.all([fleet.save(), unitsInThePlanet.save()])
}

type FinishExploreFleetType = {
  fleet: IFleetDocument
  player: IPlayerDocument
  fromPlanet: IPlanetDocument
  toPlanet: IPlanetDocument
  taskData: ITask<'FINISH_FLEET_UNITS_TASK'>['data']
  second: number
}

async function processFinishExploreFleetTask({
  fleet,
  player,
  fromPlanet,
  toPlanet,
  taskData,
  second
}: FinishExploreFleetType) {
  const executeTaskAt = second + fleet.duration

  // finish actual fleet
  fleet.isFinished = true

  // create returning fleet
  const newReturningFleet = new FleetModel({
    playerId: player._id.toString(),
    units: taskData.units,
    isReturning: true,
    isFinished: false,
    fromPlanet: toPlanet,
    toPlanet: fromPlanet,
    startedAt: second,
    arriveAt: executeTaskAt,
    duration: fleet.duration,
    fleetType: taskData.fleetType,
    resources: 0
  })

  toPlanet.isExplored = true

  // TODO: implement createBaseTask helper function
  const finishBuildUnitsTask: ITask<FinishFleetTaskType> = {
    type: FINISH_FLEET_TASK_TYPE,
    universeId: player.universeId,
    data: {
      playerId: player._id.toString(),
      fromPlanetId: toPlanet._id.toString(),
      toPlanetId: fromPlanet._id.toString(),
      units: taskData.units,
      resources: taskData.resources,
      fleetType: taskData.fleetType,
      allUnitsInThePlanet: taskData.allUnitsInThePlanet,
      allResourcesInThePlanet: taskData.allResourcesInThePlanet,
      isReturning: true,
      arriveAt: executeTaskAt,
      fleetId: newReturningFleet._id.toString()
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

  newReturningFleet.taskId = newTask._id.toString()

  // TODO: create exploration report

  const isAlreadyExplored = toPlanet.exploredBy.some(
    (exploredPlayer) => exploredPlayer === player._id.toString()
  )

  if (!isAlreadyExplored) {
    toPlanet.exploredBy.push(player._id.toString())
  }

  return Promise.all([newTask.save(), toPlanet.save(), fleet.save(), newReturningFleet.save()])
}
