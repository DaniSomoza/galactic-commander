import { IFleetUnits } from '../../types/IFleet'
import getAmountOfStarFighters from './getAmountOfStarFighters'
import getFleetStarFighterCapacity from './getFleetStarFighterCapacity'

function getBaseFleetSpeed(units: IFleetUnits[]): number {
  const starFighterCapacity = getFleetStarFighterCapacity(units)
  const amountOfStarFighters = getAmountOfStarFighters(units)

  const spaceshipUnits = units.filter(({ unit }) => unit.type === 'SPACESHIP')

  if (starFighterCapacity > amountOfStarFighters) {
    const spaceshipUnitsWithoutStarFighters = spaceshipUnits.filter(
      ({ unit }) => unit.subtype !== 'STAR_FIGHTER'
    )

    return spaceshipUnitsWithoutStarFighters.reduce((fleetSpeed, { unit }) => {
      return fleetSpeed < unit.stats.speed ? fleetSpeed : unit.stats.speed
    }, spaceshipUnitsWithoutStarFighters[0].unit.stats.speed)
  }

  return spaceshipUnits.reduce((fleetSpeed, { unit }) => {
    return fleetSpeed < unit.stats.speed ? fleetSpeed : unit.stats.speed
  }, spaceshipUnits[0].unit.stats.speed)
}

export default getBaseFleetSpeed
