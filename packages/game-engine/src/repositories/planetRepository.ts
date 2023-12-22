import PlanetModel from '../models/PlanetModel'

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
    // TODO: discard planets quality [90, 100]
  }).exec()
}

const planetRepository = {
  findPlanetById,
  findAvailablePrincipalPlanets
}

export default planetRepository
