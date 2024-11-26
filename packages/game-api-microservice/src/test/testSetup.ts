import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

import PlayerModel from 'game-engine/dist/models/PlayerModel'
import UniverseModel from 'game-engine/dist/models/UniverseModel'
import UNIVERSE_TEST_MOCK from 'game-engine/dist/test/mocks/universeMocks'
import researches from 'game-engine/dist/assets/researches/researches'
import races from 'game-engine/dist/assets/races/races'
import pirates from 'game-engine/dist/assets/races/pirates'
import RaceModel from 'game-engine/dist/models/RaceModel'
import raceRepository from 'game-engine/dist/repositories/raceRepository'
import planetRepository from 'game-engine/dist/repositories/planetRepository'
import universeRepository from 'game-engine/dist/repositories/universeRepository'
import PlanetModel from 'game-engine/dist/models/PlanetModel'
import { IPlayer } from 'game-engine/dist/types/IPlayer'
import ResearchModel from 'game-engine/dist/models/ResearchModel'
import { PLAYER_TEST_1_PIRATE } from 'game-engine/dist/test/mocks/playerMocks'
import ALL_PLANETS_MOCK, { PRINCIPAL_PLANET_TEST_1 } from 'game-engine/dist/test/mocks/planetMocks'
import { TaskType } from 'game-engine/dist/types/ITask'
import getTaskModel from 'game-engine/dist/models/TaskModel'

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

  const principalPlanet = await planetRepository.findPlanetByCoordinates(
    PRINCIPAL_PLANET_TEST_1.coordinates
  )

  // player test 1 pirate
  const player1: IPlayer = {
    ...PLAYER_TEST_1_PIRATE,
    race: (await raceRepository.findRaceByName(pirates.name))!,
    universe: (await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name))!,
    planets: {
      principal: principalPlanet!,
      colonies: [principalPlanet!]
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
