import {
  ITask,
  PENDING_TASK_STATUS,
  StartBuildUnitsTaskType,
  FinishBuildUnitsTaskType,
  FINISH_BUILD_UNITS_TASK_TYPE
} from '../../types/ITask'
import getTaskModel, { ITaskTypeDocument } from '../../models/TaskModel'
import playerRepository from '../../repositories/playerRepository'
import GameEngineError from '../errors/GameEngineError'
import getSecond from '../../helpers/getSecond'
import checkUnitRequirements from '../units/checkUnitRequirements'
import isHeroAlreadyBuild from '../units/isHeroAlreadyBuild'
import isValidUnitAmount from '../units/isValidUnitAmount'
import computedBonus from '../bonus/computedBonus'
import { UnitTypes } from '../../types/IUnit'
import { IBonus } from '../../types/IBonus'
import { IPlanet } from '../../types/IPlanet'
import getPlayerUnit from '../units/getPlayerUnit'
import getFirstUnitInTheBuildQueue from '../units/getFirstUnitInTheBuildQueue'
import taskRepository from '../../repositories/taskRepository'
import createStartBuildUnitsTask from './utils/createStartBuildUnitsTask'

async function processStartBuildUnitsTask(
  task: ITaskTypeDocument<StartBuildUnitsTaskType>,
  second: number
) {
  // get all the required data from DB
  const player = await playerRepository.findPlayerById(task.data.playerId)

  if (!player) {
    throw new GameEngineError('invalid player')
  }

  const planet = player.planets.colonies.find(
    (playerColony) => playerColony._id.toString() === task.data.planetId
  )

  if (!planet) {
    throw new GameEngineError('invalid planet owner')
  }

  const unit = getPlayerUnit(player, task.data.build.unitId, planet)

  if (!unit) {
    throw new GameEngineError('invalid unit')
  }

  if (unit.type === 'TROOP' && !!planet.unitBuild.troops.activeBuild) {
    throw new GameEngineError('player already building troops in this planet')
  }

  if (unit.type === 'SPACESHIP' && !!planet.unitBuild.spaceships.activeBuild) {
    throw new GameEngineError('player already building spaceships in this planet')
  }

  if (unit.type === 'DEFENSE' && !!planet.unitBuild.defenses.activeBuild) {
    throw new GameEngineError('player already building defenses in this planet')
  }

  const buildUnitsType: Record<UnitTypes, keyof IPlanet['unitBuild']> = {
    TROOP: 'troops',
    SPACESHIP: 'spaceships',
    DEFENSE: 'defenses'
  }

  const { isUnitAvailable, requirements } = checkUnitRequirements(unit, player)
  const isValidAmount = isValidUnitAmount(unit, task.data.build.amount, player)
  const isHeroUnitAlreadyBuild = isHeroAlreadyBuild(unit, player.fleets)

  const resourceCost = unit.resourceCost * task.data.build.amount
  const unitEnergyCost = unit.energyCost || 0
  const energy = unitEnergyCost * task.data.build.amount

  const hasEnoughResources = planet.resources >= resourceCost

  const checkBuildUnitsQueue =
    !isUnitAvailable || !isValidAmount || isHeroUnitAlreadyBuild || !hasEnoughResources

  if (checkBuildUnitsQueue) {
    const nextBuildUnits = planet.unitBuild[buildUnitsType[unit.type]].queue.shift()
    const nextUnitInTheQueue = getFirstUnitInTheBuildQueue(player, planet, nextBuildUnits)

    if (nextUnitInTheQueue && nextBuildUnits) {
      const buildUnitsTask = createStartBuildUnitsTask(
        task.universeId,
        player._id.toString(),
        planet._id.toString(),
        nextUnitInTheQueue._id.toString(),
        nextBuildUnits.amount
      )

      await Promise.all([planet.save(), taskRepository.createStartBuildUnitsTask(buildUnitsTask)])
    }
  }

  if (!isUnitAvailable) {
    throw new GameEngineError('unit not available for this player', requirements)
  }

  if (!isValidAmount) {
    throw new GameEngineError('invalid unit amount')
  }

  if (isHeroUnitAlreadyBuild) {
    throw new GameEngineError('invalid unit, hero already build')
  }

  if (!hasEnoughResources) {
    throw new GameEngineError('no resources available', {
      resourceCost,
      planetResources: planet.resources
    })
  }

  const buildUnitsBono: Record<UnitTypes, keyof IBonus> = {
    TROOP: 'TROOPS_TRAINING_BONUS',
    SPACESHIP: 'FLEET_BUILDING_BONUS',
    DEFENSE: 'DEFENSES_BUILDING_BONUS'
  }

  const buildUnitsBonus = computedBonus(player.perks, buildUnitsBono[unit.type])
  const duration = task.data.build.amount * unit.buildBaseTime * (100 / buildUnitsBonus)

  const executeTaskAt = getSecond(second + duration)

  // TODO: implement createBaseTask helper function
  const finishBuildUnitsTask: ITask<FinishBuildUnitsTaskType> = {
    type: FINISH_BUILD_UNITS_TASK_TYPE,
    universeId: player.universeId,
    data: {
      playerId: player._id.toString(),
      planetId: planet._id.toString(),
      build: {
        unitId: task.data.build.unitId,
        amount: task.data.build.amount,
        unitType: unit.type,
        duration,
        resourceCost,
        energy
      }
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
  const taskModel = getTaskModel<FinishBuildUnitsTaskType>()
  const newTask = new taskModel(finishBuildUnitsTask)

  planet.unitBuild[buildUnitsType[unit.type]].activeBuild = {
    unitId: unit._id.toString(),
    unitName: unit.name,
    unitType: unit.type,
    amount: task.data.build.amount,
    taskId: newTask._id.toString(),
    executeTaskAt,
    energy,
    resourceCost
  }

  planet.resources -= resourceCost

  return Promise.all([newTask.save(), planet.save(), player.save()])
}

export default processStartBuildUnitsTask
