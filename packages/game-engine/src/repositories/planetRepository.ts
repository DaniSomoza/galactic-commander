import PlanetModel from '../models/PlanetModel'
import { IPlanet, IPlanetCoordinates } from '../types/IPlanet'

async function findPlanetById(planetId: string) {
  return PlanetModel.findById(planetId).exec()
}

async function findAvailablePrincipalPlanets() {
  return PlanetModel.find({
    isSpecial: false,
    isPrincipal: false,
    isExplored: false,
    isUnderConquer: false,
    ownerId: null
  }).exec()
}

async function findPlanetByCoordinates(coordinates: IPlanetCoordinates) {
  return PlanetModel.findOne({
    coordinates
  }).exec()
}

async function findPlanetsBySystem(galaxy: number, sector: number, system: number) {
  return PlanetModel.find({
    'coordinates.galaxy': galaxy,
    'coordinates.sector': sector,
    'coordinates.system': system
  }).exec()
}

async function insertPlanets(planets: IPlanet[]) {
  return PlanetModel.insertMany(planets)
}

const planetRepository = {
  findPlanetById,
  findPlanetByCoordinates,
  findAvailablePrincipalPlanets,
  findPlanetsBySystem,
  insertPlanets
}

export default planetRepository
