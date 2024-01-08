import mongoose from 'mongoose'

import getTaskModel, {
  ERROR_TASK_STATUS,
  ITask,
  NEW_PLAYER_TASK_TYPE,
  NewPlayerTaskType,
  PENDING_TASK_STATUS,
  PROCESSED_TASK_STATUS
} from '../models/TaskModel'
import planetRepository from '../repositories/planetRepository'
import playerRepository from '../repositories/playerRepository'
import raceRepository from '../repositories/raceRepository'
import taskRepository from '../repositories/taskRepository'
import universeRepository from '../repositories/universeRepository'
import { AVAILABLE_PLANET_TEST_1 } from './mocks/planetMocks'
import UNIVERSE_TEST_MOCK from './mocks/universeMocks'
import pirates from '../assets/races/pirates'
import processTasks from '../engine/processTasks'
import PlayerModel, { IPlayer } from '../models/PlayerModel'
import { IBonus } from '../models/ResearchModel'
import { IRaceDocument } from '../models/RaceModel'
import { IPlanetDocument } from '../models/PlanetModel'

describe('process new player creation Task', () => {
  it('process a new valid player (pirates race)', async () => {
    const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)

    const newPlayerUsername = 'test_username'
    const newPlayerEmail = 'test_username@example.com'
    const newPlayerRace = await raceRepository.findRaceByName(pirates.name)

    const newPlayerTask: ITask<NewPlayerTaskType> = {
      type: NEW_PLAYER_TASK_TYPE,
      universe: universe!._id,
      data: {
        username: newPlayerUsername,
        email: newPlayerEmail,
        race: newPlayerRace!._id
      },

      status: PENDING_TASK_STATUS,
      isCancellable: false,

      executeTaskAt: null,
      processedAt: null,
      processingDuration: null,

      history: [
        {
          taskStatus: PENDING_TASK_STATUS,
          updatedAt: new Date().getTime()
        }
      ],

      errorDetails: null
    }

    const taskModel = getTaskModel<NewPlayerTaskType>()
    await taskModel.create(newPlayerTask)

    const task = await taskRepository.findNewPlayerTaskByUsername(newPlayerUsername, universe!._id)
    const player = await playerRepository.findPlayerByUsername(newPlayerUsername, universe!._id)
    const principalPlanet = await planetRepository.findPlanetByCoordinates(
      AVAILABLE_PLANET_TEST_1.coordinates
    )

    // we need to mock findAvailablePrincipalPlanets to return always the same mocked planet
    jest
      .spyOn(planetRepository, 'findAvailablePrincipalPlanets')
      .mockResolvedValue([principalPlanet!])

    expect(task!.status).toBe(PENDING_TASK_STATUS)
    expect(task!.isCancellable).toBe(false)
    expect(task!.processedAt).toBeNull()

    expect(player).toBeNull()

    expect(principalPlanet!.owner).toBeNull()
    expect(principalPlanet!.isPrincipal).toBe(false)
    expect(principalPlanet!.isExplored).toBe(false)
    expect(principalPlanet!.colonizedAt).toBe(AVAILABLE_PLANET_TEST_1.colonizedAt)
    expect(principalPlanet!.resources).toBe(AVAILABLE_PLANET_TEST_1.resources)
    expect(principalPlanet!.resourceQuality).toBe(AVAILABLE_PLANET_TEST_1.resourceQuality)
    expect(principalPlanet!.lastResourceProductionTime).toBe(
      AVAILABLE_PLANET_TEST_1.lastResourceProductionTime
    )

    // we process the task here
    await processTasks([task!], universe!)

    const processedTask = await taskRepository.findNewPlayerTaskByUsername(
      newPlayerUsername,
      universe!._id,
      PROCESSED_TASK_STATUS
    )
    const createdPlayer = await playerRepository.findPlayerByUsername(
      newPlayerUsername,
      universe!._id
    )
    const newPrincipalPlanet = await planetRepository.findPlanetByCoordinates(
      AVAILABLE_PLANET_TEST_1.coordinates
    )

    expect(processedTask!.status).toBe(PROCESSED_TASK_STATUS)
    expect(processedTask!.isCancellable).toBe(false)
    expect(processedTask!.processedAt).toBe(universe?.lastProcessedTime)

    expect(createdPlayer!.username).toBe(task!.data.username)
    expect(createdPlayer!.email).toBe(task!.data.email)

    const playerRace = createdPlayer!.race as IRaceDocument

    expect(playerRace._id).toEqual(task!.data.race)

    const playerPrincipalPlanet = createdPlayer!.principalPlanet as IPlanetDocument
    const playerPlanets = createdPlayer!.planets as IPlanetDocument[]
    const playerPlanetsExplored = createdPlayer!.planetsExplored as IPlanetDocument[]

    expect(playerPrincipalPlanet._id).toEqual(newPrincipalPlanet!._id)
    expect(playerPlanets.map((planet) => planet._id)).toEqual([newPrincipalPlanet!._id])
    expect(playerPlanetsExplored.map((planet) => planet._id)).toEqual([newPrincipalPlanet!._id])
    const playerBonus = createdPlayer!.bonus[0].bonus

    Object.keys(pirates.bonus).forEach((key) => {
      const bonusName = key as keyof IBonus
      expect(playerBonus[bonusName]).toEqual(playerRace.bonus[bonusName])
    })

    // TODO: Add researches
    // TODO: Add activeResearch
    expect(createdPlayer!.fleetEnergy).toEqual(newPlayerRace?.baseFleetEnergy)
    expect(createdPlayer!.troopsPopulation).toEqual(newPlayerRace?.baseTroopsPopulation)

    expect(newPrincipalPlanet!.owner).toEqual(createdPlayer!._id)
    expect(newPrincipalPlanet!.isPrincipal).toBe(true)
    expect(newPrincipalPlanet!.isExplored).toBe(true)
    expect(newPrincipalPlanet!.colonizedAt).toBe(universe?.lastProcessedTime)
    expect(newPrincipalPlanet!.resources).toBe(newPlayerRace!.baseResources)
    expect(newPrincipalPlanet!.resourceQuality).toBe(100)
    expect(newPrincipalPlanet!.lastResourceProductionTime).toBe(universe?.lastProcessedTime)
  })

  it('task error if no principal planet is available for the new player', async () => {
    const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)

    const newPlayerUsername = 'test_username'
    const newPlayerEmail = 'test_username@example.com'
    const newPlayerRace = await raceRepository.findRaceByName(pirates.name)

    const newPlayerTask: ITask<NewPlayerTaskType> = {
      type: NEW_PLAYER_TASK_TYPE,
      universe: universe!._id,
      data: {
        username: newPlayerUsername,
        email: newPlayerEmail,
        race: newPlayerRace!._id
      },

      status: PENDING_TASK_STATUS,
      isCancellable: false,

      executeTaskAt: null,
      processedAt: null,
      processingDuration: null,

      history: [
        {
          taskStatus: PENDING_TASK_STATUS,
          updatedAt: new Date().getTime()
        }
      ],

      errorDetails: null
    }

    const taskModel = getTaskModel<NewPlayerTaskType>()
    await taskModel.create(newPlayerTask)

    const task = await taskRepository.findNewPlayerTaskByUsername(newPlayerUsername, universe!._id)
    const player = await playerRepository.findPlayerByUsername(newPlayerUsername, universe!._id)

    // we need to mock findAvailablePrincipalPlanets to return always the same mocked planet
    jest.spyOn(planetRepository, 'findAvailablePrincipalPlanets').mockResolvedValue([])

    expect(task!.status).toBe(PENDING_TASK_STATUS)
    expect(task!.isCancellable).toBe(false)
    expect(task!.processedAt).toBeNull()

    expect(player).toBeNull()

    // we process the invalid task here
    await processTasks([task!], universe!)

    const processedTask = await taskRepository.findNewPlayerTaskByUsername(
      newPlayerUsername,
      universe!._id,
      ERROR_TASK_STATUS
    )

    const createdPlayer = await playerRepository.findPlayerByUsername(
      newPlayerUsername,
      universe!._id
    )

    expect(processedTask!.status).toBe(ERROR_TASK_STATUS)
    expect(processedTask!.isCancellable).toBe(false)
    expect(processedTask!.processedAt).toBe(universe?.lastProcessedTime)
    expect(processedTask!.errorDetails).toBe('no principal planet available')

    expect(createdPlayer).toBeNull()
  })

  it('task error if invalid race', async () => {
    const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)

    const newPlayerUsername = 'test_username'
    const newPlayerEmail = 'test_username@example.com'

    const newPlayerTask: ITask<NewPlayerTaskType> = {
      type: NEW_PLAYER_TASK_TYPE,
      universe: universe!._id,
      data: {
        username: newPlayerUsername,
        email: newPlayerEmail,
        // invalid raceId
        race: new mongoose.Types.ObjectId()
      },

      status: PENDING_TASK_STATUS,
      isCancellable: false,

      executeTaskAt: null,
      processedAt: null,
      processingDuration: null,

      history: [
        {
          taskStatus: PENDING_TASK_STATUS,
          updatedAt: new Date().getTime()
        }
      ],

      errorDetails: null
    }

    const taskModel = getTaskModel<NewPlayerTaskType>()
    await taskModel.create(newPlayerTask)

    const task = await taskRepository.findNewPlayerTaskByUsername(newPlayerUsername, universe!._id)
    const player = await playerRepository.findPlayerByUsername(newPlayerUsername, universe!._id)
    const principalPlanet = await planetRepository.findPlanetByCoordinates(
      AVAILABLE_PLANET_TEST_1.coordinates
    )

    // we need to mock findAvailablePrincipalPlanets to return always the same mocked planet
    jest
      .spyOn(planetRepository, 'findAvailablePrincipalPlanets')
      .mockResolvedValue([principalPlanet!])

    expect(task!.status).toBe(PENDING_TASK_STATUS)
    expect(task!.isCancellable).toBe(false)
    expect(task!.processedAt).toBeNull()

    expect(player).toBeNull()

    expect(principalPlanet!.owner).toBeNull()

    // we process the invalid task here
    await processTasks([task!], universe!)

    const processedTask = await taskRepository.findNewPlayerTaskByUsername(
      newPlayerUsername,
      universe!._id,
      ERROR_TASK_STATUS
    )
    const createdPlayer = await playerRepository.findPlayerByUsername(
      newPlayerUsername,
      universe!._id
    )
    const newPrincipalPlanet = await planetRepository.findPlanetByCoordinates(
      AVAILABLE_PLANET_TEST_1.coordinates
    )

    expect(processedTask!.status).toBe(ERROR_TASK_STATUS)
    expect(processedTask!.isCancellable).toBe(false)
    expect(processedTask!.processedAt).toBe(universe?.lastProcessedTime)

    expect(processedTask!.errorDetails).toBe('invalid race')

    expect(createdPlayer).toBeNull()

    expect(newPrincipalPlanet!.owner).toBeNull()
  })

  it('task error if player creation error', async () => {
    const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)

    const newPlayerUsername = 'invalid_test_username'
    const newPlayerEmail = 'test_username@example.com'
    const newPlayerRace = await raceRepository.findRaceByName(pirates.name)

    const newPlayerTask: ITask<NewPlayerTaskType> = {
      type: NEW_PLAYER_TASK_TYPE,
      universe: universe!._id,
      data: {
        username: newPlayerUsername,
        email: newPlayerEmail,
        race: newPlayerRace!._id
      },

      status: PENDING_TASK_STATUS,
      isCancellable: false,

      executeTaskAt: null,
      processedAt: null,
      processingDuration: null,

      history: [
        {
          taskStatus: PENDING_TASK_STATUS,
          updatedAt: new Date().getTime()
        }
      ],

      errorDetails: null
    }

    const taskModel = getTaskModel<NewPlayerTaskType>()
    await taskModel.create(newPlayerTask)

    const task = await taskRepository.findNewPlayerTaskByUsername(newPlayerUsername, universe!._id)
    const player = await playerRepository.findPlayerByUsername(newPlayerUsername, universe!._id)
    const principalPlanet = await planetRepository.findPlanetByCoordinates(
      AVAILABLE_PLANET_TEST_1.coordinates
    )

    // we need to mock findAvailablePrincipalPlanets to return always the same mocked planet
    jest
      .spyOn(planetRepository, 'findAvailablePrincipalPlanets')
      .mockResolvedValue([principalPlanet!])

    expect(task!.status).toBe(PENDING_TASK_STATUS)
    expect(task!.isCancellable).toBe(false)
    expect(task!.processedAt).toBeNull()

    expect(player).toBeNull()

    // we force a player already exists error
    const newPlayerData: IPlayer = {
      username: newPlayerUsername,
      email: newPlayerEmail,
      race: newPlayerRace!,
      universe: universe!,

      principalPlanet: principalPlanet!,

      planets: [principalPlanet!],
      planetsExplored: [principalPlanet!],

      bonus: [],
      points: [],
      researches: [],

      fleetEnergy: newPlayerRace!.baseFleetEnergy,
      troopsPopulation: newPlayerRace!.baseTroopsPopulation
    }

    await (await PlayerModel.create(newPlayerData)).save()

    // we process the invalid task here
    await processTasks([task!], universe!)

    const processedTask = await taskRepository.findNewPlayerTaskByUsername(
      newPlayerUsername,
      universe!._id,
      ERROR_TASK_STATUS
    )
    const newPrincipalPlanet = await planetRepository.findPlanetByCoordinates(
      AVAILABLE_PLANET_TEST_1.coordinates
    )

    expect(processedTask!.status).toBe(ERROR_TASK_STATUS)
    expect(processedTask!.isCancellable).toBe(false)
    expect(processedTask!.processedAt).toBe(universe?.lastProcessedTime)
    expect(processedTask!.errorDetails).toBe(
      'E11000 duplicate key error collection: test.players index: username_1 dup key: { username: "invalid_test_username" }'
    )

    expect(newPrincipalPlanet!.owner).toBeNull()
  })
})
