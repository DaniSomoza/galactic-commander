import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

import { PLAYER_TEST_1_PIRATE } from './mocks/playerMocks'
import PlayerModel from '../models/PlayerModel'
import races from '../assets/races/races'
import RaceModel from '../models/RaceModel'
import raceRepository from '../repositories/raceRepository'
import pirates from '../assets/races/pirates'
import ALL_PLANETS_MOCK, { PRINCIPAL_PLANET_TEST_1 } from './mocks/planetMocks'
import PlanetModel from '../models/PlanetModel'
import planetRepository from '../repositories/planetRepository'
import getTaskModel from '../models/TaskModel'
import UniverseModel from '../models/UniverseModel'
import UNIVERSE_TEST_MOCK from './mocks/universeMocks'
import ResearchModel from '../models/ResearchModel'
import researches from '../assets/researches/researches'
import { IPlayer } from '../types/IPlayer'
import { TaskType } from '../types/ITask'
import UnitModel from '../models/UnitModel'
import FleetModel from '../models/FleetModel'
import ALL_UNITS_MOCK from './mocks/unitMocks'

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
  const universeId = universe._id.toString()

  // add test planets
  await Promise.all(
    ALL_PLANETS_MOCK.map(async (planet) =>
      (await PlanetModel.create({ ...planet, universeId })).save()
    )
  )

  // add all researches (we can use production values)
  const testResearches = await Promise.all(
    researches.map(async (research) => (await ResearchModel.create(research)).save())
  )

  // add unit with requisites
  const unitsWithRequisites = ALL_UNITS_MOCK.map((unit) => ({
    ...unit,
    requirements: {
      researches: unit.requirements.researches.map(({ level, research: playerResearch }) => ({
        level,
        research: testResearches.find((research) => research.name === playerResearch.name)!._id
      }))
    }
  }))

  const testUnits = await Promise.all(
    unitsWithRequisites.map((research) => UnitModel.create(research))
  )

  // add all races (we can use production values)
  await Promise.all(
    races.map((race) =>
      RaceModel.create({
        ...race,
        researches: testResearches
          .filter((research) => research.raceName === race.name)
          .map((research) => research._id),

        units: testUnits
          .filter((unit) => unit.raceName === race.name)
          .map((research) => research._id)
      })
    )
  )

  const principalPlanet = (await planetRepository.findPlanetByCoordinates(
    PRINCIPAL_PLANET_TEST_1.coordinates
  ))!

  const testPlayerRace = (await raceRepository.findRaceByName(pirates.name))!

  // player test 1 pirate
  const player1: IPlayer = {
    ...PLAYER_TEST_1_PIRATE,
    race: testPlayerRace,
    universeId,
    planets: {
      principal: principalPlanet,
      colonies: [principalPlanet]
    }
  }

  const player1Pirate = await PlayerModel.create(player1)

  // update test player principal planet
  principalPlanet.ownerId = player1Pirate._id.toString()

  await principalPlanet.save()
  await universe.save()
}

export async function restoreTestDatabase() {
  await UniverseModel.deleteMany({})
  await RaceModel.deleteMany({})
  await ResearchModel.deleteMany({})
  await PlanetModel.deleteMany({})
  await PlayerModel.deleteMany({})
  await UnitModel.deleteMany({})
  await FleetModel.deleteMany({})
  const taskModel = getTaskModel<TaskType>()
  await taskModel.deleteMany({})
}

beforeAll(connectToTestDatabase)

beforeEach(mockTestGameDatabase)

afterEach(restoreTestDatabase)

afterAll(disconnectToTestDatabase)
