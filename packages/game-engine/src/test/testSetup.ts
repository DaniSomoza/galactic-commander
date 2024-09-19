import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

import { PLAYER_TEST_1_PIRATE } from './mocks/playerMocks'
import PlayerModel, { IPlayer } from '../models/PlayerModel'
import races from '../assets/races/races'
import RaceModel from '../models/RaceModel'
import raceRepository from '../repositories/raceRepository'
import pirates from '../assets/races/pirates'
import ALL_PLANETS_MOCK, { PRINCIPAL_PLANET_TEST_1 } from './mocks/planetMocks'
import PlanetModel from '../models/PlanetModel'
import planetRepository from '../repositories/planetRepository'
import getTaskModel, { TaskType } from '../models/TaskModel'
import UniverseModel from '../models/UniverseModel'
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
  const universe = await UniverseModel.create(UNIVERSE_TEST_MOCK)

  // add all researches (we can use production values)
  const testResearches = await Promise.all(
    researches.map((research) => ResearchModel.create(research))
  )

  // add all races (we can use production values)
  await Promise.all(
    races.map((race) =>
      RaceModel.create({
        ...race,
        researches: testResearches
          .filter((research) => research.raceName === race.name)
          .map((research) => research._id)
      })
    )
  )

  // add test planets
  await Promise.all(ALL_PLANETS_MOCK.map((planet) => PlanetModel.create({ ...planet, universe })))

  // TODO: create a new Generic test player instead of this in a before each instead of this...
  const principalPlanet = await planetRepository.findPlanetByCoordinates(
    PRINCIPAL_PLANET_TEST_1.coordinates
  )

  // player test 1 pirate
  const player1: IPlayer = {
    ...PLAYER_TEST_1_PIRATE,
    race: (await raceRepository.findRaceByName(pirates.name))!,
    universe: (await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name))!,
    planets: {
      principal: principalPlanet!._id,
      colonies: [principalPlanet!._id],
      explored: [principalPlanet!._id]
    }
  }

  const player1Pirate = await PlayerModel.create(player1)

  // update player principal planet
  principalPlanet!.owner = player1Pirate._id
  await principalPlanet!.save()
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

beforeAll(connectToTestDatabase)

beforeEach(mockTestGameDatabase)

afterEach(restoreTestDatabase)

afterAll(disconnectToTestDatabase)
