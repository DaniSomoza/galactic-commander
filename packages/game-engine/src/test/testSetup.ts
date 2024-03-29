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
import UniverseModel, { IUniverse } from '../models/UniverseModel'
import UNIVERSE_TEST_MOCK from './mocks/universeMocks'
import universeRepository from '../repositories/universeRepository'
import ResearchModel from '../models/ResearchModel'
import researches from '../assets/researches/researches'

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

  // add all researches (we can use production values)
  const testResearches = await Promise.all([
    ...researches.map((research) => ResearchModel.create(research))
  ])

  // add all races (we can use production values)
  await Promise.all([
    ...races.map((race) =>
      RaceModel.create({
        ...race,
        researches: testResearches
          .filter((research) => research.raceName === race.name)
          .map((research) => research._id)
      })
    )
  ])

  // add test planets
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
  const player1Pirate = await PlayerModel.create(PLAYER_TEST_1_PIRATE)

  // update planets
  player1PrincipalPlanet.owner = player1Pirate._id
  await player1PrincipalPlanet.save()
}

export async function restoreTestDatabase() {
  await Promise.all([UniverseModel.deleteMany({})])
  await Promise.all([RaceModel.deleteMany({})])
  await Promise.all([ResearchModel.deleteMany({})])
  await Promise.all([PlanetModel.deleteMany({})])
  await Promise.all([PlayerModel.deleteMany({})])
  const taskModel = getTaskModel<TaskType>()
  await Promise.all([taskModel.deleteMany({})])
}

beforeAll(async () => {
  await connectToTestDatabase()
})

beforeEach(mockTestGameDatabase)

afterEach(restoreTestDatabase)

afterAll(async () => {
  await disconnectToTestDatabase()
})
