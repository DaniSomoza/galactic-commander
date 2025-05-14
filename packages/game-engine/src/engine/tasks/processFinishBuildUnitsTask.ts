import { IPoint } from '../../types/IPoint'
import { FinishBuildUnitsTaskType } from '../../types/ITask'
import GameEngineError from '../errors/GameEngineError'
import PointModel from '../../models/PointModel'
import { ITaskTypeDocument } from '../../models/TaskModel'
import playerRepository from '../../repositories/playerRepository'
import upgradeBonus from '../bonus/upgradeBonus'
import hasBonus from '../../helpers/hasBonus'
import getTotalAmountOfUnits from '../units/getTotalAmountOfUnits'
import { UnitTypes } from '../../types/IUnit'
import { IPlanet } from '../../types/IPlanet'
import createStartBuildUnitsTask from './utils/createStartBuildUnitsTask'
import taskRepository from '../../repositories/taskRepository'
import playerUnitsRepository from '../../repositories/playerUnitsRepository'
import getPlayerUnit from '../units/getPlayerUnit'
import getFirstUnitInTheBuildQueue from '../units/getFirstUnitInTheBuildQueue'
import PlayerUnitsModel from '../../models/PlayerUnitsModel'

async function processFinishBuildUnitsTask(
  task: ITaskTypeDocument<FinishBuildUnitsTaskType>,
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

  const playerUnitsInThePlanet = await playerUnitsRepository.findPlayerUnitsInThePlanet(
    player._id.toString(),
    planet._id.toString()
  )

  const unitsInThePlanet =
    playerUnitsInThePlanet ||
    new PlayerUnitsModel({
      planet,
      player,
      units: []
    })

  const planetUnit = unitsInThePlanet.units.find(({ unit }) => unit._id.equals(unit._id))

  // add unit or update amount
  if (planetUnit) {
    planetUnit.amount += task.data.build.amount
  } else {
    unitsInThePlanet.units.push({
      unit,
      amount: task.data.build.amount
    })
  }

  // upgrade player bonus if present in the unit
  const hasBonusToUpdate = hasBonus(unit.bonus)

  if (hasBonusToUpdate) {
    const playerUnits = await playerUnitsRepository.findPlayerUnits(player._id.toString())
    const PlayerBonus = player.perks.find((perk) => perk.sourceId === unit._id.toString())

    if (PlayerBonus) {
      const totalAmountOfUnits = getTotalAmountOfUnits(playerUnits, unit)
      PlayerBonus.bonus = upgradeBonus(unit.bonus, totalAmountOfUnits + task.data.build.amount)
    } else {
      player.perks.push({
        bonus: upgradeBonus(unit.bonus, task.data.build.amount),
        sourceId: unit._id.toString(),
        sourceName: unit.name,
        type: 'Unit'
      })
    }
  }

  const point: IPoint = {
    playerId: player._id.toString(),
    taskId: task._id.toString(),
    points: task.data.build.resourceCost,
    sourceId: task.data.build.unitId,
    sourceName: unit.name,
    type: 'Unit',
    second
  }

  const points = new PointModel(point)

  const buildUnitsType: Record<UnitTypes, keyof IPlanet['unitBuild']> = {
    TROOP: 'troops',
    SPACESHIP: 'spaceships',
    DEFENSE: 'defenses'
  }

  planet.unitBuild[buildUnitsType[unit.type]].activeBuild = undefined

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

    return Promise.all([
      player.save(),
      unitsInThePlanet.save(),
      points.save(),
      planet.save(),
      taskRepository.createStartBuildUnitsTask(buildUnitsTask)
    ])
  }

  return Promise.all([player.save(), unitsInThePlanet.save(), points.save(), planet.save()])
}

export default processFinishBuildUnitsTask
