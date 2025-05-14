import { IFleetUnits } from '../../types/IFleet'

function getFleetResourceCapacity(units: IFleetUnits[]): number {
  return units.reduce((resourceCapacity, { unit, amount }) => {
    return unit.stats.cargo * amount + resourceCapacity
  }, 0)
}

export default getFleetResourceCapacity
