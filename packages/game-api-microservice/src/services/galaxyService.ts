import universeRepository from 'game-engine/dist/repositories/universeRepository'
import playerRepository from 'game-engine/dist/repositories/playerRepository'
import planetRepository from 'game-engine/dist/repositories/planetRepository'
import { GALAXIES, SECTORS_PER_GALAXIES, SYSTEM_PER_SECTORS } from 'game-engine/dist/types/IPlanet'
import NotFoundError from 'auth-microservice/dist/errors/NotFoundError'
import BadRequestError from 'auth-microservice/dist/errors/BadRequestError'

import cleanPlanetFields from '../utils/cleanPlanetFields'

type Coordinates = {
  galaxy: string
  sector: string
  system: string
}

async function getGalaxy(username: string, universeName: string, coordinates: Coordinates) {
  const galaxy = Number(coordinates.galaxy)
  const sector = Number(coordinates.sector)
  const system = Number(coordinates.system)

  const isValidGalaxy = galaxy > 0 && galaxy <= GALAXIES
  const isValidSector = sector > 0 && sector <= SECTORS_PER_GALAXIES
  const isValidSystem = system > 0 && system <= SYSTEM_PER_SECTORS

  if (!isValidGalaxy || !isValidSector || !isValidSystem || !universeName) {
    throw new BadRequestError('invalid coordinates', { universeName, galaxy, sector, system })
  }

  const universe = await universeRepository.findUniverseByName(universeName)

  if (!universe) {
    throw new NotFoundError('invalid universe', { universeName })
  }

  const universeId = universe._id.toString()

  const player = await playerRepository.findPlayerByUsername(username, universeId)

  if (!player) {
    throw new NotFoundError('invalid player', { username, universeName })
  }

  const planets = await planetRepository.findPlanetsBySystem(galaxy, sector, system)

  const exploredPlanets = planets.map((planet) => {
    const isExplored = planet.exploredBy.some((exploredPlayer) =>
      exploredPlayer._id.equals(player._id)
    )

    if (isExplored) {
      // remove build queue info
      planet.unitBuild = {
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

      return cleanPlanetFields(planet)
    }

    // unexplored planet
    return {
      name: '???',
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
      unitBuild: {
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
      },
      units: [],
      exploredBy: []
    }
  })

  return {
    planets: exploredPlanets
  }
}

const galaxyService = {
  getGalaxy
}

export default galaxyService
