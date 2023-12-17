import crypto from 'crypto'
import {
  GALAXIES,
  PLANETS_PER_SYSTEM,
  SECTORS_PER_GALAXIES,
  SYSTEM_PER_SECTORS,
  DEFAULT_PLANET_RESOURCES,
  IPlanet
} from '../models/PlanetModel'
import getRandomNumber from './getRandomNumber'

function generatePlanets(): IPlanet[] {
  const planets: IPlanet[] = []

  for (let galaxy = 1; galaxy <= GALAXIES; galaxy++) {
    for (let sector = 1; sector <= SECTORS_PER_GALAXIES; sector++) {
      for (let system = 1; system <= SYSTEM_PER_SECTORS; system++) {
        for (let planet = 1; planet <= PLANETS_PER_SYSTEM; planet++) {
          planets.push({
            name: generateDefaultPlanetName(),
            owner: null,
            colonizedAt: 0,

            resources: DEFAULT_PLANET_RESOURCES,
            resourceQuality: getRandomNumber(0, 100),
            lastResourceProductionTime: 0,

            coordinates: {
              galaxy,
              sector,
              system,
              planet,
              label: generateDefaultPlanetLabel(galaxy, sector, system, planet)
            },

            isSpecial: false,
            isPrincipal: false,
            isUnderConquer: false,
            isExplored: false,

            specials: [],

            isBuildingFleets: false,
            isTrainingTroops: false,
            isBuildingDefenses: false
          })
        }
      }
    }
  }

  return planets
}

export default generatePlanets

function generateDefaultPlanetName() {
  return crypto.randomBytes(12).toString('hex')
}

function generateDefaultPlanetLabel(
  galaxy: number,
  sector: number,
  system: number,
  planet: number
): string {
  return `${galaxy}:${sector}:${system}:${planet}`
}
