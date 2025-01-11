import { IPlayerUnits } from '../../types/IPlayerUnits'
import { IUnit } from '../../types/IUnit'

function getTotalAmountOfUnits(playerUnits: IPlayerUnits[], unit: IUnit): number {
  return playerUnits.reduce((totalAmountOfUnits, playerFleet) => {
    const fleetUnit = playerFleet.units.find((fleetUnit) => fleetUnit.unit.name === unit.name)

    return fleetUnit ? totalAmountOfUnits + fleetUnit.amount : totalAmountOfUnits
  }, 0)
}

export default getTotalAmountOfUnits
