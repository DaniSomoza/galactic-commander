import { IFleetUnits } from '../../types/IFleet'

function getFleetStarFighterCapacity(units: IFleetUnits[]): number {
  return units.reduce((starFighterCapacity, { unit, amount }) => {
    return unit.stats.starFighterCapacity * amount + starFighterCapacity
  }, 0)
}

export default getFleetStarFighterCapacity
