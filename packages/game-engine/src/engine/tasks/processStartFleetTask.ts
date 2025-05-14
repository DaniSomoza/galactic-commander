import FleetModel from '../../models/FleetModel'
import { IPlanetDocument } from '../../models/PlanetModel'
import { IPlayerDocument } from '../../models/PlayerModel'
import { IPlayerUnitsDocument } from '../../models/PlayerUnitsModel'
import getTaskModel, { ITaskTypeDocument } from '../../models/TaskModel'
import fleetRepository from '../../repositories/fleetRepository'
import planetRepository from '../../repositories/planetRepository'
import playerRepository from '../../repositories/playerRepository'
import playerUnitsRepository from '../../repositories/playerUnitsRepository'
import {
  FINISH_FLEET_TASK_TYPE,
  FinishFleetTaskType,
  ITask,
  PENDING_TASK_STATUS,
  StartFleetTaskType
} from '../../types/ITask'
import computedBonus from '../bonus/computedBonus'
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

  const activePlayerFleets = await fleetRepository.findFleetsByPlayerId(player._id.toString())

  const maxPlayerFleets = computedBonus(player.perks, 'MAX_FLEETS_ALLOWED_BONUS')

  if (activePlayerFleets && activePlayerFleets.length > maxPlayerFleets) {
    throw new GameEngineError('invalid amount of active fleets')
  }

  const playerUnitsInThePlanet = await playerUnitsRepository.findPlayerUnitsInThePlanet(
    player._id.toString(),
    fromPlanet._id.toString()
  )

  if (!playerUnitsInThePlanet) {
    throw new GameEngineError('invalid units in the planet')
  }

  // units present in the planet and no defenses present
  const isInvalidFleetUnits = task.data.units.some(({ unit, amount }) => {
    const planetUnit = playerUnitsInThePlanet.units.find(
      (planetUnit) => planetUnit.unit.name === unit.name
    )

    return !planetUnit || amount > planetUnit.amount || unit.type === 'DEFENSE'
  })

  if (isInvalidFleetUnits) {
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
    return processStartExploreFleetTask({
      player,
      fromPlanet,
      toPlanet,
      taskData: task.data,
      second,
      playerUnitsInThePlanet
    })
  }

  throw 'fleet type not implemented'
}

export default processStartFleetTask

type StartExploreFleetType = {
  player: IPlayerDocument
  fromPlanet: IPlanetDocument
  toPlanet: IPlanetDocument
  taskData: ITask<'START_FLEET_UNITS_TASK'>['data']
  second: number
  playerUnitsInThePlanet: IPlayerUnitsDocument
}

async function processStartExploreFleetTask({
  player,
  fromPlanet,
  toPlanet,
  taskData,
  second,
  playerUnitsInThePlanet
}: StartExploreFleetType) {
  const fleetDuration = getFleetDuration(fromPlanet, toPlanet, taskData.units, player)
  const executeTaskAt = second + fleetDuration

  // update planet units
  taskData.units.forEach((fleetUnit) => {
    const planetUnit = playerUnitsInThePlanet.units.find(
      ({ unit }) => unit.name === fleetUnit.unit.name
    )

    planetUnit!.amount -= fleetUnit.amount
  })

  const newPlayerFleet = new FleetModel({
    playerId: player._id.toString(),
    units: taskData.units,
    isReturning: false,
    isFinished: false,
    fromPlanet,
    toPlanet,
    startedAt: second,
    arriveAt: executeTaskAt,
    duration: fleetDuration,
    fleetType: taskData.fleetType,
    resources: 0
  })

  // TODO: implement createBaseTask helper function
  const finishFleetTask: ITask<FinishFleetTaskType> = {
    type: FINISH_FLEET_TASK_TYPE,
    universeId: player.universeId,
    data: {
      playerId: player._id.toString(),
      fromPlanetId: fromPlanet._id.toString(),
      toPlanetId: toPlanet._id.toString(),
      units: taskData.units,
      resources: 0,
      fleetType: taskData.fleetType,
      allUnitsInThePlanet: false,
      allResourcesInThePlanet: false,
      isReturning: false,
      arriveAt: executeTaskAt,
      fleetId: newPlayerFleet._id.toString()
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
  const newTask = new taskModel(finishFleetTask)

  newPlayerFleet.taskId = newTask._id.toString()

  return Promise.all([
    newTask.save(),
    player.save(),
    playerUnitsInThePlanet.save(),
    newPlayerFleet.save(),
    fromPlanet.save()
  ])
}
