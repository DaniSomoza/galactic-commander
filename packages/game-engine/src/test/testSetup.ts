import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

import { PLAYER_TEST_1_PIRATE } from './mocks/playerMocks'
import PlayerModel from '../models/PlayerModel'
import races from '../assets/races/races'
import RaceModel, { IRace } from '../models/RaceModel'
import raceRepository from '../repositories/raceRepository'
import pirates from '../assets/races/pirates'
import ALL_PLANETS_MOCK, { PRINCIPAL_PLANET_TEST_1 } from './mocks/planetMocks'
import PlanetModel, { IPlanetDocument } from '../models/PlanetModel'
import planetRepository from '../repositories/planetRepository'
import getTaskModel, { TaskType } from '../models/TaskModel'
import UniverseModel from '../models/UniverseModel'
import UNIVERSE_TEST_MOCK from './mocks/universeMocks'

// initialize database
let mongoTestDB = new MongoMemoryServer()

export async function connectToTestDatabase() {
  mongoTestDB = await MongoMemoryServer.create()
  const mongoUri = await mongoTestDB.getUri()
  await mongoose.connect(mongoUri)
}

export async function disconnectToTestDatabase() {
  await mongoose.disconnect()
  await mongoTestDB.stop()
}

export async function mockTestDatabase() {
  // add test universe
  await UniverseModel.create(UNIVERSE_TEST_MOCK)

  // add all races (we can use production values for them)
  await Promise.all([...races.map((races) => RaceModel.create(races))])

  // add all planets
  await Promise.all([...ALL_PLANETS_MOCK.map((planet) => PlanetModel.create(planet))])

  // player test 1 pirate
  PLAYER_TEST_1_PIRATE.race = (await raceRepository.findRaceByName(pirates.name)) as IRace
  const player1PrincipalPlanet = (await planetRepository.findPlanetByCoordinates(
    PRINCIPAL_PLANET_TEST_1.coordinates
  )) as IPlanetDocument
  PLAYER_TEST_1_PIRATE.principalPlanet = player1PrincipalPlanet
  PLAYER_TEST_1_PIRATE.planets = [player1PrincipalPlanet]
  PLAYER_TEST_1_PIRATE.planetsExplored = [player1PrincipalPlanet]
  const player1Pirate = await PlayerModel.create(PLAYER_TEST_1_PIRATE)

  // update planets
  player1PrincipalPlanet.owner = player1Pirate._id
  await player1PrincipalPlanet.save()
}

export async function restoreTestDatabase() {
  await Promise.all([UniverseModel.deleteMany({})])
  await Promise.all([RaceModel.deleteMany({})])
  await Promise.all([PlanetModel.deleteMany({})])
  await Promise.all([PlayerModel.deleteMany({})])
  const taskModel = getTaskModel<TaskType>()
  await Promise.all([taskModel.deleteMany({})])
}

beforeAll(async () => {
  await connectToTestDatabase()
})

beforeEach(mockTestDatabase)

afterEach(restoreTestDatabase)

afterAll(async () => {
  await disconnectToTestDatabase()
})
