import { IPlanetDocument } from 'game-engine/models/PlanetModel'
import { IPlanet } from 'game-engine/types/IPlanet'

import { PlanetType } from '../types/Planet'

function cleanPlanetFields(planet: IPlanetDocument | IPlanet): PlanetType {
  const {
    name,
    universeId,
    imgUrl,
    ownerId,
    colonizedAt,
    resources,
    resourceQuality,
    lastResourceProductionTime,
    coordinates,
    isSpecial,
    isPrincipal,
    isUnderConquer,
    isExplored,
    specials,
    unitBuild,
    units
  } = planet

  return {
    name,
    universeId,
    imgUrl,
    ownerId,
    colonizedAt,
    resources,
    resourceQuality,
    lastResourceProductionTime,
    coordinates,
    isSpecial,
    isPrincipal,
    isUnderConquer,
    isExplored,
    specials,
    unitBuild,
    units
  }
}

export default cleanPlanetFields
