import { IPoint } from '../../types/IPoint'
import { FinishBuildUnitsTaskType } from '../../types/ITask'
import GameEngineError from '../errors/GameEngineError'
import PointModel from '../../models/PointModel'
import { ITaskTypeDocument } from '../../models/TaskModel'
import playerRepository from '../../repositories/playerRepository'
import upgradeBonus from '../bonus/upgradeBonus'
import FleetModel from '../../models/FleetModel'
import hasBonus from '../../helpers/hasBonus'
import getTotalAmountOfUnits from '../units/getTotalAmountOfUnits'
import { UnitTypes } from '../../types/IUnit'
import { IPlanet } from '../../types/IPlanet'

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

  const raceUnit = player.race.units.find(
    (raceUnit) => raceUnit._id.toString() === task.data.build.unitId
  )
  const specialPlanetUnit = planet.units.find(
    (planetUnit) => planetUnit._id.toString() === task.data.build.unitId
  )

  const unit = raceUnit || specialPlanetUnit

  if (!unit) {
    // TODO: check build units queue

    throw new GameEngineError('invalid unit')
  }

  // planet fleet (no travel defined)
  const existingPlanetFleet = player.fleets.find(
    (fleet) => fleet.planet._id.equals(planet._id) && !fleet.travel
  )

  const planetFleet =
    existingPlanetFleet ||
    new FleetModel({
      planet,
      playerId: player._id,
      units: [
        {
          unit,
          amount: task.data.build.amount
        }
      ]
    })

  // update player fleets with the new fleet
  if (!existingPlanetFleet) {
    player.fleets.push(planetFleet)
  }

  const fleetUnit = planetFleet.units.find((fleetUnit) => fleetUnit.unit._id.equals(unit._id))

  if (fleetUnit) {
    fleetUnit.amount += task.data.build.amount
  } else {
    planetFleet.units.push({
      unit,
      amount: task.data.build.amount
    })
  }

  // upgrade player bonus if present in the unit
  const hasBonusToUpdate = hasBonus(unit.bonus)

  if (hasBonusToUpdate) {
    const PlayerBonus = player.perks.find((perk) => perk.sourceId === unit._id.toString())

    if (PlayerBonus) {
      const totalAmountOfUnits = getTotalAmountOfUnits(player, unit)
      PlayerBonus.bonus = upgradeBonus(unit.bonus, totalAmountOfUnits)
    } else {
      player.perks.push({
        bonus: unit.bonus,
        sourceId: unit._id.toString(),
        sourceName: unit.name,
        type: 'Unit'
      })
    }
  }

  const point: IPoint = {
    playerId: player._id.toString(),
    taskId: task._id.toString(),
    points: task.data.buildUnitsResourceCost,
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

  // TODO: check planets.builds.queue

  return Promise.all([player.save(), planetFleet.save(), points.save(), planet.save()])
}

export default processFinishBuildUnitsTask
