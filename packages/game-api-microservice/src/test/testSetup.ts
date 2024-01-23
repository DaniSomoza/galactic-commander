import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

import Server from '../configuration/Server'
import playerRoutes from '../routes/playerRoutes'
import PlayerModel from 'game-engine/dist/models/PlayerModel'
import UniverseModel, { IUniverse } from 'game-engine/dist/models/UniverseModel'
import UNIVERSE_TEST_MOCK from 'game-engine/dist/test/mocks/universeMocks'
import races from 'game-engine/dist/assets/races/races'
import pirates from 'game-engine/dist/assets/races/pirates'
import RaceModel, { IRace } from 'game-engine/dist/models/RaceModel'
import raceRepository from 'game-engine/dist/repositories/raceRepository'
import planetRepository from 'game-engine/dist/repositories/planetRepository'
import universeRepository from 'game-engine/dist/repositories/universeRepository'
import PlanetModel, { IPlanetDocument } from 'game-engine/dist/models/PlanetModel'
import { PLAYER_TEST_1_PIRATE } from 'game-engine/dist/test/mocks/playerMocks'
import ALL_PLANETS_MOCK, { PRINCIPAL_PLANET_TEST_1 } from 'game-engine/dist/test/mocks/planetMocks'
import getTaskModel, { TaskType } from 'game-engine/dist/models/TaskModel'

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

export async function mockTestGameDatabase() {
  // add test universe
  await UniverseModel.create(UNIVERSE_TEST_MOCK)

  // add all races (we can use production values for them)
  await Promise.all([...races.map((races) => RaceModel.create(races))])

  // add all planets
  await Promise.all([...ALL_PLANETS_MOCK.map((planet) => PlanetModel.create(planet))])

  // TODO: create a new test player instead of this in a before each instead of this...

  // player test 1 pirate
  PLAYER_TEST_1_PIRATE.race = (await raceRepository.findRaceByName(pirates.name)) as IRace
  PLAYER_TEST_1_PIRATE.universe = (await universeRepository.findUniverseByName(
    UNIVERSE_TEST_MOCK.name
  )) as IUniverse
  const player1PrincipalPlanet = (await planetRepository.findPlanetByCoordinates(
    PRINCIPAL_PLANET_TEST_1.coordinates
  )) as IPlanetDocument
  PLAYER_TEST_1_PIRATE.principalPlanet = player1PrincipalPlanet
  PLAYER_TEST_1_PIRATE.planets = [player1PrincipalPlanet]
  PLAYER_TEST_1_PIRATE.planetsExplored = [player1PrincipalPlanet]
  // TODO: bonus
  // TODO: researches
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

// initialize server
const serverOptions = {
  logger: false
}

export const testServer = new Server(serverOptions)
testServer.addRoutes(playerRoutes)
const port = 3_000
const host = '0.0.0.0'
testServer.start(host, port)
testServer.configureCors(['http://localhost:3000'])

beforeAll(async () => {
  await connectToTestDatabase()
})

beforeEach(mockTestGameDatabase)

afterEach(restoreTestDatabase)

afterAll(async () => {
  await disconnectToTestDatabase()
  await testServer.server.close()
})
