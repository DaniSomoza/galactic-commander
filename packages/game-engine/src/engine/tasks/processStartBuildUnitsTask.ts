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

async function processStartBuildUnitsTask(
  task: ITaskTypeDocument<StartBuildUnitsTaskType>,
  second: number
) {
  // get all the required data from DB
  const player = await playerRepository.findPlayerById(task.data.playerId)

  if (!player) {
    throw new GameEngineError('invalid player')
  }

  const planet = player.planets.colonies.find((playerColony) =>
    playerColony._id.equals(task.data.planetId)
  )

  if (!planet) {
    throw new GameEngineError('invalid planet owner')
  }

  const raceUnit = player.race.units.find((raceUnit) => raceUnit._id.equals(task.data.build.unitId))
  const specialPlanetUnit = planet.units.find((planetUnit) =>
    planetUnit._id.equals(task.data.build.unitId)
  )

  const unit = raceUnit || specialPlanetUnit

  if (!unit) {
    // TODO: check build units queue

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

  const { isUnitAvailable, requirements } = checkUnitRequirements(unit, player)

  if (!isUnitAvailable) {
    throw new GameEngineError('unit not available for this player', requirements)
  }

  // TODO: create buildUnits queue

  if (isValidUnitAmount(unit, task.data.build.amount, player)) {
    // TODO: check build units queue

    throw new GameEngineError('invalid unit amount')
  }

  if (isHeroAlreadyBuild(unit, player.fleets)) {
    throw new GameEngineError('invalid unit, hero already build')
  }

  const resourceCost = unit.resourceCost * task.data.build.amount

  const hasEnoughResources = planet.resources >= resourceCost

  if (!hasEnoughResources) {
    // TODO: check build units queue

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
  const buildUnitsDuration = task.data.build.amount * unit.buildBaseTime * (100 / buildUnitsBonus)

  const executeTaskAt = getSecond(second + buildUnitsDuration)

  // TODO: implement createBaseTask helper function
  const finishBuildUnitsTask: ITask<FinishBuildUnitsTaskType> = {
    type: FINISH_BUILD_UNITS_TASK_TYPE,
    universe: player.universe._id,
    data: {
      build: task.data.build,
      playerId: player._id,
      planetId: planet._id,
      buildUnitType: unit.type,
      buildUnitsDuration: buildUnitsDuration,
      buildUnitsResourceCost: resourceCost
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

  const buildUnitsType: Record<UnitTypes, keyof IPlanet['unitBuild']> = {
    TROOP: 'troops',
    SPACESHIP: 'spaceships',
    DEFENSE: 'defenses'
  }

  planet.unitBuild[buildUnitsType[unit.type]].activeBuild = {
    unitId: unit._id,
    unitType: unit.type,
    amount: task.data.build.amount,
    taskId: newTask._id
  }

  planet.resources -= resourceCost

  return Promise.all([newTask.save(), planet.save(), player.save()])
}

export default processStartBuildUnitsTask
