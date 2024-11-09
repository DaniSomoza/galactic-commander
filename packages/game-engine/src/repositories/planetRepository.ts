import PlanetModel, { PlanetCoordinates } from '../models/PlanetModel'

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

async function findPlanetByCoordinates(coordinates: PlanetCoordinates) {
  return PlanetModel.findOne({
    coordinates: coordinates
  }).exec()
}

const planetRepository = {
  findPlanetById,
  findPlanetByCoordinates,
  findAvailablePrincipalPlanets
}

export default planetRepository
