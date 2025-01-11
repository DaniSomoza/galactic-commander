import { IPlayerUnits } from '../../types/IPlayerUnits'
import { IUnit } from '../../types/IUnit'

function isHeroAlreadyBuild(unit: IUnit, playerUnits: IPlayerUnits[]): boolean {
  return (
    unit.isHero &&
    !!playerUnits.find(({ units }) => units.some(({ unit }) => unit.name === unit.name))
  )
}

export default isHeroAlreadyBuild
