import PlanetModel from '../models/PlanetModel'
import { IPlanetCoordinates } from '../types/IPlanet'

async function findPlanetById(planetId: string) {
  return PlanetModel.findById(planetId).exec()
}

async function findAvailablePrincipalPlanets() {
  return PlanetModel.find({
    isSpecial: false,
    isPrincipal: false,
    isExplored: false,
    isUnderConquer: false,
    owner: null
  }).exec()
}

async function findPlanetByCoordinates(coordinates: IPlanetCoordinates) {
  return PlanetModel.findOne({
    coordinates
  }).exec()
}

// TODO: findPlanetsBySystem? => return all planets of a system

const planetRepository = {
  findPlanetById,
  findPlanetByCoordinates,
  findAvailablePrincipalPlanets
}

export default planetRepository
