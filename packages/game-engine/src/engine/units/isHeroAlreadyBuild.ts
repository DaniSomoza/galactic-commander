import { IFleet } from '../../types/IFleet'
import { IUnit } from '../../types/IUnit'

function isHeroAlreadyBuild(unit: IUnit, fleets: IFleet[]): boolean {
  return (
    unit.isHero &&
    !!fleets.find((fleet) => fleet.units.some((fleetUnit) => fleetUnit.unit.name === unit.name))
  )
}

export default isHeroAlreadyBuild
