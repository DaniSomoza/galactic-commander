import { IPlanetDocument } from '../../models/PlanetModel'
import { IPlayerDocument } from '../../models/PlayerModel'
import { IUnitDocument } from '../../models/UnitModel'
import { BuildUnitsQueueType } from '../../types/IUnit'

function getFirstUnitInTheBuildQueue(
  player: IPlayerDocument,
  planet: IPlanetDocument,
  nextBuildUnits?: BuildUnitsQueueType
): IUnitDocument | undefined {
  if (nextBuildUnits) {
    const raceUnit = player.race.units.find((raceUnit) => raceUnit.name === nextBuildUnits.unitName)
    const specialPlanetUnit = planet.units.find(
      (planetUnit) => planetUnit.name === nextBuildUnits.unitName
    )

    return raceUnit || specialPlanetUnit
  }
}

export default getFirstUnitInTheBuildQueue
