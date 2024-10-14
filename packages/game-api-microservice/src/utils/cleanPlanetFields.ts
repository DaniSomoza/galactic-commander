import { IPlanetDocument } from 'game-engine/models/PlanetModel'

import { PlanetType } from '../types/Planet'

function cleanPlanetFields(planet: IPlanetDocument): PlanetType {
  const {
    name,
    owner,
    colonizedAt,
    resources,
    resourceQuality,
    lastResourceProductionTime,
    universe,
    coordinates,
    isSpecial,
    isPrincipal,
    isUnderConquer,
    isExplored,
    specials,
    isBuildingFleets,
    isTrainingTroops,
    isBuildingDefenses
  } = planet

  return {
    name,
    owner: owner?.toString() || null,
    colonizedAt,
    resources,
    resourceQuality,
    lastResourceProductionTime,
    universe: universe.toString(),
    coordinates,
    isSpecial,
    isPrincipal,
    isUnderConquer,
    isExplored,
    specials: specials.map((special) => special.toString()),
    isBuildingFleets,
    isTrainingTroops,
    isBuildingDefenses
  }
}

export default cleanPlanetFields
