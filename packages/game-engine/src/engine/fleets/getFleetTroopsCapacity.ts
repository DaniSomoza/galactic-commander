import { IFleetUnits } from '../../types/IFleet'

function getFleetTroopsCapacity(units: IFleetUnits[]): number {
  return units.reduce((troopsCapacity, { unit, amount }) => {
    return unit.stats.troopsCapacity * amount + troopsCapacity
  }, 0)
}

export default getFleetTroopsCapacity
