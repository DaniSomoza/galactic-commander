import mongoose from 'mongoose'

import getTaskModel from '../models/TaskModel'
import planetRepository from '../repositories/planetRepository'
import playerRepository from '../repositories/playerRepository'
import raceRepository from '../repositories/raceRepository'
import taskRepository from '../repositories/taskRepository'
import universeRepository from '../repositories/universeRepository'
import { AVAILABLE_PLANET_TEST_1 } from './mocks/planetMocks'
import UNIVERSE_TEST_MOCK from './mocks/universeMocks'
import pirates from '../assets/races/pirates'
import processTasks from '../engine/processTasks'
import PlayerModel from '../models/PlayerModel'
import { ITask, NewPlayerTaskType } from '../types/ITask'

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

    expect(createdPlayer!.user.username).toBe(task!.data.username)
    expect(createdPlayer!.user.email).toBe(task!.data.email)

    const playerRace = createdPlayer!.race

    expect(playerRace._id).toEqual(task!.data.race)

    const playerPrincipalPlanet = createdPlayer!.planets.principal
    const colonies = createdPlayer!.planets.colonies
    const playerPlanetsExplored = createdPlayer!.planets.explored

    expect(playerPrincipalPlanet._id).toEqual(newPrincipalPlanet!._id)
    expect(colonies.map((planet) => planet._id)).toEqual([newPrincipalPlanet!._id])
    expect(playerPlanetsExplored.map((planet) => planet._id)).toEqual([newPrincipalPlanet!._id])
    const playerBonus = createdPlayer!.perks[0].bonus

    Object.keys(pirates.bonus).forEach((key) => {
      const bonusName = key as keyof IBonus
      expect(playerBonus[bonusName]).toEqual(playerRace.bonus[bonusName])
    })

    expect(createdPlayer!.points).toEqual([])

    expect(createdPlayer!.researches.researched).toEqual([])
    expect(createdPlayer!.researches.activeResearch).toBeUndefined()

    expect(createdPlayer!.units.fleets.energy).toEqual(0)
    expect(createdPlayer!.units.troops.population).toEqual(0)

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

  it('task error if player already exists', async () => {
    const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)

    const newPlayerEmail = 'test_username@example.com'
    const newPlayerRace = await raceRepository.findRaceByName(pirates.name)

    const newPlayerTask: ITask<NewPlayerTaskType> = {
      type: NEW_PLAYER_TASK_TYPE,
      universe: universe!._id,
      data: {
        username: 'invalid_test_username',
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

    const task = await taskRepository.findNewPlayerTaskByUsername(
      'invalid_test_username',
      universe!._id
    )
    const player = await playerRepository.findPlayerByUsername(
      'invalid_test_username',
      universe!._id
    )
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
      user: {
        username: 'invalid_test_username',
        email: newPlayerEmail
      },

      race: newPlayerRace!,
      universe: universe!,

      planets: {
        principal: principalPlanet!,
        colonies: [principalPlanet!],
        explored: [principalPlanet!._id]
      },

      perks: [],
      points: [],
      researches: {
        researched: [],
        queue: []
      },

      units: {
        troops: {
          population: newPlayerRace!.baseTroopsPopulation
        },
        fleets: {
          energy: newPlayerRace!.baseFleetEnergy
        },
        defenses: {
          structures: 0
        }
      }
    }

    await PlayerModel.create(newPlayerData)

    // we process the invalid task here
    await processTasks([task!], universe!)

    const processedTask = await taskRepository.findNewPlayerTaskByUsername(
      'invalid_test_username',
      universe!._id,
      ERROR_TASK_STATUS
    )
    const newPrincipalPlanet = await planetRepository.findPlanetByCoordinates(
      AVAILABLE_PLANET_TEST_1.coordinates
    )

    expect(processedTask!.status).toBe(ERROR_TASK_STATUS)
    expect(processedTask!.isCancellable).toBe(false)
    expect(processedTask!.processedAt).toBe(universe?.lastProcessedTime)
    expect(processedTask!.errorDetails).toBe('player already created')

    expect(newPrincipalPlanet!.owner).toBeNull()
  })
})
