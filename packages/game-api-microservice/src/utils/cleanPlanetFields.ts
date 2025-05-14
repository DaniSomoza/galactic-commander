import { IPlanetDocument } from 'game-engine/models/PlanetModel'
import { IPlayerDocument } from 'game-engine/models/PlayerModel'
import { IPlanet } from 'game-engine/types/IPlanet'
import { PlanetType } from '../types/Planet'

function cleanPlanetFields(planet: IPlanetDocument | IPlanet, player: IPlayerDocument): PlanetType {
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
    specials,
    unitBuild,
    units,
    exploredBy
  } = planet

  const isExplored = exploredBy.some((playerId) => playerId === player._id.toString())

  if (!isExplored) {
    const UNEXPLORED_PLANET: PlanetType = {
      name: '',
      universeId,
      imgUrl: '/planets/unexplored_planet.jpeg',
      ownerId: null,
      colonizedAt: 0,
      resources: 0,
      resourceQuality: 0,
      lastResourceProductionTime: 0,
      coordinates: planet.coordinates,
      isSpecial: false,
      isPrincipal: false,
      isUnderConquer: false,
      isExplored: false,
      specials: [],
      unitBuild: EMPTY_BUILD_UNITS_QUEUE,
      units: [],
      exploredBy: []
    }

    return UNEXPLORED_PLANET
  }

  // TODO: only if the owner of the planet is the player show resources, unitBuild, lastResourceProductionTime, specials, units...

  const isPlayerPlanet = player._id.toString() === ownerId

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
    unitBuild: isPlayerPlanet ? unitBuild : EMPTY_BUILD_UNITS_QUEUE,
    units,
    exploredBy: []
  }
}

export default cleanPlanetFields

const EMPTY_BUILD_UNITS_QUEUE = {
  troops: {
    activeBuild: undefined,
    queue: []
  },
  spaceships: {
    activeBuild: undefined,
    queue: []
  },
  defenses: {
    activeBuild: undefined,
    queue: []
  }
}
