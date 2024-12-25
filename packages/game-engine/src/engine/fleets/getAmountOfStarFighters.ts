import { IFleetUnits } from '../../types/IFleet'

function getAmountOfStarFighters(units: IFleetUnits[]): number {
  return units.reduce((starFighters, { unit, amount }) => {
    const isStarFighter = unit.subtype === 'STAR_FIGHTER'

    if (isStarFighter) {
      return amount + starFighters
    }

    return starFighters
  }, 0)
}

export default getAmountOfStarFighters
