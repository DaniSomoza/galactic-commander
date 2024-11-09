import crypto from 'crypto'
import mongoose from 'mongoose'

import {
  GALAXIES,
  PLANETS_PER_SYSTEM,
  SECTORS_PER_GALAXIES,
  SYSTEM_PER_SECTORS,
  IPlanet
} from '../models/PlanetModel'
import getRandomNumber from './getRandomNumber'
import getSecond from './getSecond'
import getPlanetImgUrl from './getPlanetImgUrl'

// TODO: create a universeConfig for test (galaxy, sector, system, planet)

// TODO: add more galaxies based on number of players, time, etc... (and send an email notification for it)
function generatePlanets(universe: mongoose.Types.ObjectId): IPlanet[] {
  const planets: IPlanet[] = []

  for (let galaxy = 1; galaxy <= GALAXIES; galaxy++) {
    for (let sector = 1; sector <= SECTORS_PER_GALAXIES; sector++) {
      for (let system = 1; system <= SYSTEM_PER_SECTORS; system++) {
        for (let planet = 1; planet <= PLANETS_PER_SYSTEM; planet++) {
          const resourceQuality = getRandomNumber(10, 100)

          planets.push({
            name: generateDefaultPlanetName(),

            imgUrl: getPlanetImgUrl(resourceQuality),

            owner: null,
            colonizedAt: 0,

            universe,

            resources: getRandomNumber(100, resourceQuality * 100),
            resourceQuality,
            lastResourceProductionTime: getSecond(new Date().getTime()),

            coordinates: {
              galaxy,
              sector,
              system,
              planet
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
