import processNewPlayerTask from '../engine/tasks/processNewPlayerTask'
import getTaskModel, {
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
import { IBonus } from '../models/RaceModel'
import pirates from '../assets/races/pirates'

describe('process new player Task', () => {
  afterEach(() => {
    jest.restoreAllMocks()
  })

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

    const task = await taskRepository.findNewPlayerTaskByUsername(newPlayerUsername)
    const player = await playerRepository.findPlayerByUsername(newPlayerUsername)
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

    const secondToProcess = 1_000

    // we process the task here
    await processNewPlayerTask(task!, secondToProcess)

    const precessedTask = await taskRepository.findNewPlayerTaskByUsername(newPlayerUsername)
    const createdPlayer = await playerRepository.findPlayerByUsername(newPlayerUsername)
    const newPrincipalPlanet = await planetRepository.findPlanetByCoordinates(
      AVAILABLE_PLANET_TEST_1.coordinates
    )

    expect(precessedTask!.status).toBe(PROCESSED_TASK_STATUS)
    expect(precessedTask!.isCancellable).toBe(false)
    expect(precessedTask!.processedAt).toBe(secondToProcess)

    expect(createdPlayer!.username).toBe(task!.data.username)
    expect(createdPlayer!.email).toBe(task!.data.email)
    expect(createdPlayer!.race).toEqual(task!.data.race)
    expect(createdPlayer!.principalPlanet).toEqual(newPrincipalPlanet!._id)
    expect(createdPlayer!.planets).toEqual([newPrincipalPlanet!._id])
    expect(createdPlayer!.planetsExplored).toEqual([newPrincipalPlanet!._id])
    Object.keys(createdPlayer!.bonus[0]).forEach((key) => {
      const bonusName = key as keyof IBonus
      expect(createdPlayer!.bonus[0][bonusName]).toEqual(newPlayerRace?.bonus[bonusName])
    })
    expect(createdPlayer!.fleetEnergy).toEqual(newPlayerRace?.baseFleetEnergy)
    expect(createdPlayer!.troopsPopulation).toEqual(newPlayerRace?.baseTroopsPopulation)
    expect(createdPlayer!.resourceProduction).toEqual(1)

    expect(newPrincipalPlanet!.owner).toEqual(createdPlayer!._id)
    expect(newPrincipalPlanet!.isPrincipal).toBe(true)
    expect(newPrincipalPlanet!.isExplored).toBe(true)
    expect(newPrincipalPlanet!.colonizedAt).toBe(secondToProcess)
    expect(newPrincipalPlanet!.resources).toBe(newPlayerRace!.baseResources)
    expect(newPrincipalPlanet!.resourceQuality).toBe(100)
    expect(newPrincipalPlanet!.lastResourceProductionTime).toBe(secondToProcess)
  })

  // TODO: un happy paths
})
