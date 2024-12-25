import FleetModel from '../../models/FleetModel'
import { ITaskTypeDocument } from '../../models/TaskModel'
import planetRepository from '../../repositories/planetRepository'
import playerRepository from '../../repositories/playerRepository'
import { IFleetUnits } from '../../types/IFleet'
import { IPlanet } from '../../types/IPlanet'
import { IPlayer } from '../../types/IPlayer'
import { StartFleetTaskType } from '../../types/ITask'
import computedBonus from '../bonus/computedBonus'
import GameEngineError from '../errors/GameEngineError'

async function processStartFleetTask(task: ITaskTypeDocument<StartFleetTaskType>, second: number) {
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

  // TODO: check if  task.data.units tiene Units populado o si son Ids

  // check units in from planet

  // check troops capacity

  // check cazas capacity

  // check que no haya DEFENSAS incluidas

  // check resources

  // fleetType

  if (task.data.fleetType === 'EXPLORE_FLEET_TYPE') {
    const newFleet = new FleetModel({
      planet: fromPlanet,
      playerId: player._id,
      units: task.data.units,
      travel: {
        destination: toPlanet,
        arriveAt: second + getFleetDuration(fromPlanet, toPlanet, task.data.units, player),
        fleetType: task.data.fleetType,
        isReturning: false,
        resources: task.data.resources
      }
    })

    player.fleets.push(newFleet)

    // TODO: create FINISH_FLEET_TASK_TYPE

    // TODO: crear reporte de espionaje
    // TODO: CALCULATE TIME
    // TODO: DO THIS IN FINISH!!!
    // TODO: create fleet
    // fromPlanet.isExplored = true
    // const isAlreadyExplored = fromPlanet.exploredBy.some((exploredPlayer) =>
    //   exploredPlayer._id.equals(player._id)
    // )
    // if (!isAlreadyExplored) {
    //   fromPlanet.exploredBy.push(player)
    // }
    return Promise.all([player.save(), newFleet.save()])
  }

  return Promise.all([fromPlanet.save()])
}

export default processStartFleetTask

// TODO: create an util
function getFleetDuration(
  from: IPlanet,
  to: IPlanet,
  units: IFleetUnits[],
  player: IPlayer
): number {
  const distance = getFleetDistance(from, to)

  const fleetSpeed = getFleetSpeed(units, player)

  // TODO: return in seconds!!!
  return distance / fleetSpeed
}

// TODO: create an util
function getFleetDistance(from: IPlanet, to: IPlanet): number {
  const planetDistance = Math.abs(from.coordinates.planet - to.coordinates.planet) * 100
  const systemDistance = Math.abs(from.coordinates.system - to.coordinates.system) * 1_000
  const sectorDistance = Math.abs(from.coordinates.sector - to.coordinates.planet) * 10_000
  const galaxyDistance = Math.abs(from.coordinates.galaxy - to.coordinates.galaxy) * 100_000

  return planetDistance + systemDistance + sectorDistance + galaxyDistance
}

// TODO: create an util
function getFleetSpeed(units: IFleetUnits[], player: IPlayer): number {
  const baseFleetSpeed = getBaseFleetSpeed(units)
  const fleetSpeedBonus = computedBonus(player.perks, 'FLEET_SPEED_BONUS')

  const fleetSpeed = fleetSpeedBonus * baseFleetSpeed

  return fleetSpeed
}

// TODO: create an util
function getBaseFleetSpeed(units: IFleetUnits[]): number {
  const starFighterCapacity = getFleetStarFighterCapacity(units)
  const numberOfStarFighters = getStarFighters(units)

  if (starFighterCapacity > numberOfStarFighters) {
    return units
      .filter(({ unit }) => unit.subtype !== 'STAR_FIGHTER')
      .filter(({ unit }) => unit.type === 'SPACESHIP')
      .reduce((fleetSpeed, { unit }) => {
        return fleetSpeed < unit.stats.speed ? fleetSpeed : unit.stats.speed
      }, 0)
  }

  return units
    .filter(({ unit }) => unit.type === 'SPACESHIP')
    .reduce((fleetSpeed, { unit }) => {
      return fleetSpeed < unit.stats.speed ? fleetSpeed : unit.stats.speed
    }, 0)
}

// TODO: create an util
function getFleetStarFighterCapacity(units: IFleetUnits[]): number {
  return units.reduce((starFighterCapacity, { unit, amount }) => {
    return unit.stats.starFighterCapacity * amount + starFighterCapacity
  }, 0)
}

// TODO: create an util
function getStarFighters(units: IFleetUnits[]): number {
  return units.reduce((starFighters, { unit, amount }) => {
    const isStarFighter = unit.subtype === 'STAR_FIGHTER'

    if (isStarFighter) {
      return amount + starFighters
    }

    return starFighters
  }, 0)
}
