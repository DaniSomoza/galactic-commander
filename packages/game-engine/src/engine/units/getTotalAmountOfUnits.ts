import { IPlayer } from '../../types/IPlayer'
import { IUnit } from '../../types/IUnit'

function getTotalAmountOfUnits(player: IPlayer, unit: IUnit): number {
  return player.fleets.reduce((totalAmountOfUnits, playerFleet) => {
    const fleetUnit = playerFleet.units.find((fleetUnit) => fleetUnit.unit.name === unit.name)

    return fleetUnit ? totalAmountOfUnits + fleetUnit.amount : totalAmountOfUnits
  }, 0)
}

export default getTotalAmountOfUnits
