import { IPlanetDocument } from '../models/PlanetModel'
import getRandomNumber from './getRandomNumber'

function getRandomPlanet(planets: IPlanetDocument[]): IPlanetDocument {
  const randomIndex = getRandomNumber(0, planets.length - 1)

  return planets[randomIndex]
}

export default getRandomPlanet
