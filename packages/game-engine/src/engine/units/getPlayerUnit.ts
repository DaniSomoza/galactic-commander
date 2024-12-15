import { IPlayerDocument } from '../../models/PlayerModel'
import { IUnitDocument } from '../../models/UnitModel'
import { IPlanetDocument } from '../../models/PlanetModel'

function getPlayerUnit(
  player: IPlayerDocument,
  unitId: string,
  planet: IPlanetDocument
): IUnitDocument | undefined {
  const raceUnit = player.race.units.find((raceUnit) => raceUnit._id.toString() === unitId)
  const specialPlanetUnit = planet.units.find((planetUnit) => planetUnit._id.toString() === unitId)

  const unit = raceUnit || specialPlanetUnit

  return unit
}

export default getPlayerUnit
