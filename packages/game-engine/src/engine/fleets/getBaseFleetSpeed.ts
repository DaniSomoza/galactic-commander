import { IFleetUnits } from '../../types/IFleet'
import getAmountOfStarFighters from './getAmountOfStarFighters'
import getFleetStarFighterCapacity from './getFleetStarFighterCapacity'

function getBaseFleetSpeed(units: IFleetUnits[]): number {
  const starFighterCapacity = getFleetStarFighterCapacity(units)
  const amountOfStarFighters = getAmountOfStarFighters(units)

  if (starFighterCapacity > amountOfStarFighters) {
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

export default getBaseFleetSpeed
