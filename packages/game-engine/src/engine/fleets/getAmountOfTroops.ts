import { IFleetUnits } from '../../types/IFleet'

function getAmountOfTroops(units: IFleetUnits[]): number {
  return units.reduce((troops, { unit, amount }) => {
    if (unit.type === 'TROOP') {
      return amount + troops
    }

    return troops
  }, 0)
}

export default getAmountOfTroops
