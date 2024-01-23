import mongoose from 'mongoose'

import PIRATE_FLEET_ATTACK_RESEARCH from '../assets/researches/pirates/pirate-fleet-attack-research'
import processTasks from '../engine/processTasks'
import { IResearchDocument } from '../models/ResearchModel'
import getTaskModel, {
  ITask,
  PENDING_TASK_STATUS,
  FinishResearchTaskType,
  FINISH_RESEARCH_TASK_TYPE,
  PROCESSED_TASK_STATUS,
  ERROR_TASK_STATUS
} from '../models/TaskModel'
import playerRepository from '../repositories/playerRepository'
import taskRepository from '../repositories/taskRepository'
import universeRepository from '../repositories/universeRepository'
import { PLAYER_TEST_1_PIRATE } from './mocks/playerMocks'
import UNIVERSE_TEST_MOCK from './mocks/universeMocks'
import PIRATE_FLEET_ENERGY_RESEARCH from '../assets/researches/pirates/pirate-fleet-energy-research'
import pirates from '../assets/races/pirates'
import PIRATE_TROOPS_POPULATION_RESEARCH from '../assets/researches/pirates/pirate-troops-population-research'

describe('process finish research task', () => {
  describe('finish bonus research task', () => {
    it('level 1 bonus research', async () => {
      const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)
      const player = await playerRepository.findPlayerByUsername(
        PLAYER_TEST_1_PIRATE.username,
        universe!._id
      )

      const research = player?.race.researches.find(
        (research) => research.name === PIRATE_FLEET_ATTACK_RESEARCH.name
      ) as IResearchDocument

      const researchDuration = 1_000
      const researchResourceCost = 1_000

      player!.activeResearch = {
        research: research!._id,
        level: 1
      }

      await player?.save()

      const finishResearchTask: ITask<FinishResearchTaskType> = {
        type: FINISH_RESEARCH_TASK_TYPE,
        universe: universe!._id,
        data: {
          player: player!._id,
          research: research!._id,
          researchDuration,
          researchResourceCost
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

      const taskModel = getTaskModel<FinishResearchTaskType>()
      const task = await taskModel.create(finishResearchTask)

      // we process the task here
      await processTasks([task!], universe!)

      const processedTask = await taskRepository.findTaskById(task._id)

      expect(processedTask!.status).toBe(PROCESSED_TASK_STATUS)
      expect(processedTask!.isCancellable).toBe(false)
      expect(processedTask!.processedAt).toBe(universe?.lastProcessedTime)

      const researchPlayer = await playerRepository.findPlayerByUsername(
        PLAYER_TEST_1_PIRATE.username,
        universe!._id
      )

      expect(researchPlayer?.activeResearch).toBe(undefined)
      expect(researchPlayer?.researches[0].level).toBe(1)
      expect(researchPlayer?.researches[0].research.name).toEqual(research.name)

      // player points
      expect(researchPlayer?.points[0].points).toEqual(1_000)
      expect(researchPlayer?.points[0].origin).toEqual(research._id)
      expect(researchPlayer?.points[0].type).toEqual('Research')
      expect(researchPlayer?.points[0].second).toEqual(universe?.lastProcessedTime)

      // old player bonus
      expect(player?.bonus).toEqual([])

      // fleetAttackBonus 10%
      expect(researchPlayer?.bonus[0].bonus.fleetAttackBonus).toEqual(10)
      expect(researchPlayer?.bonus[0].origin).toEqual(research._id)
      expect(researchPlayer?.bonus[0].type).toEqual('Research')
      expect(researchPlayer?.bonus.length).toEqual(1)
    })

    it('level 2 bonus research', async () => {
      const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)
      const player = await playerRepository.findPlayerByUsername(
        PLAYER_TEST_1_PIRATE.username,
        universe!._id
      )

      const research = player?.race.researches.find(
        (research) => research.name === PIRATE_FLEET_ATTACK_RESEARCH.name
      ) as IResearchDocument

      const researchDuration = 1_000
      const researchResourceCost = 1_000

      player!.activeResearch = {
        research: research!._id,
        level: 1
      }

      await player?.save()

      const finishLevel1ResearchTask: ITask<FinishResearchTaskType> = {
        type: FINISH_RESEARCH_TASK_TYPE,
        universe: universe!._id,
        data: {
          player: player!._id,
          research: research!._id,
          researchDuration,
          researchResourceCost
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

      const taskModel = getTaskModel<FinishResearchTaskType>()
      const level1ResearchTask = await taskModel.create(finishLevel1ResearchTask)

      // we process the task here
      await processTasks([level1ResearchTask!], universe!)

      player!.activeResearch = {
        research: research!._id,
        level: 2
      }

      await player?.save()

      const finishLevel2ResearchTask: ITask<FinishResearchTaskType> = {
        type: FINISH_RESEARCH_TASK_TYPE,
        universe: universe!._id,
        data: {
          player: player!._id,
          research: research!._id,
          researchDuration,
          researchResourceCost
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

      const task = await taskModel.create(finishLevel2ResearchTask)

      // we process the task here
      await processTasks([task!], universe!)

      const processedTask = await taskRepository.findTaskById(task._id)

      expect(processedTask!.status).toBe(PROCESSED_TASK_STATUS)
      expect(processedTask!.isCancellable).toBe(false)
      expect(processedTask!.processedAt).toBe(universe?.lastProcessedTime)

      const researchPlayer = await playerRepository.findPlayerByUsername(
        PLAYER_TEST_1_PIRATE.username,
        universe!._id
      )

      expect(researchPlayer?.activeResearch).toBe(undefined)
      expect(researchPlayer?.researches[0].level).toBe(2)
      expect(researchPlayer?.researches[0].research.name).toEqual(research.name)

      // player points
      expect(researchPlayer?.points[0].points).toEqual(1_000)
      expect(researchPlayer?.points[0].origin).toEqual(research._id)
      expect(researchPlayer?.points[0].type).toEqual('Research')
      expect(researchPlayer?.points[0].second).toEqual(universe?.lastProcessedTime)

      expect(researchPlayer?.points[1].points).toEqual(1_000)
      expect(researchPlayer?.points[1].origin).toEqual(research._id)
      expect(researchPlayer?.points[1].type).toEqual('Research')
      expect(researchPlayer?.points[1].second).toEqual(universe?.lastProcessedTime)

      // old player bonus
      expect(player?.bonus).toEqual([])

      // fleetAttackBonus 20%
      expect(researchPlayer?.bonus[0].bonus.fleetAttackBonus).toEqual(20)
      expect(researchPlayer?.bonus[0].origin).toEqual(research._id)
      expect(researchPlayer?.bonus[0].type).toEqual('Research')
      expect(researchPlayer?.bonus.length).toEqual(1)
    })
  })

  describe('finish fleet energy research task', () => {
    it('level 1 fleet energy research', async () => {
      const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)
      const player = await playerRepository.findPlayerByUsername(
        PLAYER_TEST_1_PIRATE.username,
        universe!._id
      )

      const research = player?.race.researches.find(
        (research) => research.name === PIRATE_FLEET_ENERGY_RESEARCH.name
      ) as IResearchDocument

      const researchDuration = 1_000
      const researchResourceCost = 1_000

      player!.activeResearch = {
        research: research!._id,
        level: 1
      }

      await player?.save()

      expect(player?.fleetEnergy).toBe(0)

      const finishResearchTask: ITask<FinishResearchTaskType> = {
        type: FINISH_RESEARCH_TASK_TYPE,
        universe: universe!._id,
        data: {
          player: player!._id,
          research: research!._id,
          researchDuration,
          researchResourceCost
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

      const taskModel = getTaskModel<FinishResearchTaskType>()
      const task = await taskModel.create(finishResearchTask)

      // we process the task here
      await processTasks([task!], universe!)

      const processedTask = await taskRepository.findTaskById(task._id)

      expect(processedTask!.status).toBe(PROCESSED_TASK_STATUS)
      expect(processedTask!.isCancellable).toBe(false)
      expect(processedTask!.processedAt).toBe(universe?.lastProcessedTime)

      const researchPlayer = await playerRepository.findPlayerByUsername(
        PLAYER_TEST_1_PIRATE.username,
        universe!._id
      )

      expect(researchPlayer?.activeResearch).toBe(undefined)
      expect(researchPlayer?.researches[0].level).toBe(1)
      expect(researchPlayer?.researches[0].research.name).toEqual(research.name)

      // player points
      expect(researchPlayer?.points[0].points).toEqual(1_000)
      expect(researchPlayer?.points[0].origin).toEqual(research._id)
      expect(researchPlayer?.points[0].type).toEqual('Research')
      expect(researchPlayer?.points[0].second).toEqual(universe?.lastProcessedTime)

      // new energy
      expect(researchPlayer?.fleetEnergy).toBe(pirates.baseFleetEnergy)
    })

    it('level 2 fleet energy research', async () => {
      const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)
      const player = await playerRepository.findPlayerByUsername(
        PLAYER_TEST_1_PIRATE.username,
        universe!._id
      )

      const research = player?.race.researches.find(
        (research) => research.name === PIRATE_FLEET_ENERGY_RESEARCH.name
      ) as IResearchDocument

      const researchDuration = 1_000
      const researchResourceCost = 1_000

      player!.activeResearch = {
        research: research!._id,
        level: 1
      }

      await player?.save()

      const level1FinishResearchTask: ITask<FinishResearchTaskType> = {
        type: FINISH_RESEARCH_TASK_TYPE,
        universe: universe!._id,
        data: {
          player: player!._id,
          research: research!._id,
          researchDuration,
          researchResourceCost
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

      const taskModel = getTaskModel<FinishResearchTaskType>()
      const firstTask = await taskModel.create(level1FinishResearchTask)

      // we process the task here
      await processTasks([firstTask!], universe!)

      player!.activeResearch = {
        research: research!._id,
        level: 1
      }

      await player?.save()

      const level2FinishResearchTask: ITask<FinishResearchTaskType> = {
        type: FINISH_RESEARCH_TASK_TYPE,
        universe: universe!._id,
        data: {
          player: player!._id,
          research: research!._id,
          researchDuration,
          researchResourceCost
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

      const task = await taskModel.create(level2FinishResearchTask)

      // we process the task here
      await processTasks([task!], universe!)

      const processedTask = await taskRepository.findTaskById(task._id)

      expect(processedTask!.status).toBe(PROCESSED_TASK_STATUS)
      expect(processedTask!.isCancellable).toBe(false)
      expect(processedTask!.processedAt).toBe(universe?.lastProcessedTime)

      const researchPlayer = await playerRepository.findPlayerByUsername(
        PLAYER_TEST_1_PIRATE.username,
        universe!._id
      )

      expect(researchPlayer?.activeResearch).toBe(undefined)
      expect(researchPlayer?.researches[0].level).toBe(2)
      expect(researchPlayer?.researches[0].research.name).toEqual(research.name)

      // player points
      expect(researchPlayer?.points[0].points).toEqual(1_000)
      expect(researchPlayer?.points[0].origin).toEqual(research._id)
      expect(researchPlayer?.points[0].type).toEqual('Research')
      expect(researchPlayer?.points[0].second).toEqual(universe?.lastProcessedTime)
      expect(researchPlayer?.points[1].points).toEqual(1_000)
      expect(researchPlayer?.points[1].origin).toEqual(research._id)
      expect(researchPlayer?.points[1].type).toEqual('Research')
      expect(researchPlayer?.points[1].second).toEqual(universe?.lastProcessedTime)

      // new energy
      expect(researchPlayer?.fleetEnergy).toBe(300)
    })
  })

  describe('finish troops population research task', () => {
    it('level 1 troops population research', async () => {
      const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)
      const player = await playerRepository.findPlayerByUsername(
        PLAYER_TEST_1_PIRATE.username,
        universe!._id
      )

      const research = player?.race.researches.find(
        (research) => research.name === PIRATE_TROOPS_POPULATION_RESEARCH.name
      ) as IResearchDocument

      const researchDuration = 1_000
      const researchResourceCost = 1_000

      player!.activeResearch = {
        research: research!._id,
        level: 1
      }

      await player?.save()

      expect(player?.troopsPopulation).toBe(0)

      const finishResearchTask: ITask<FinishResearchTaskType> = {
        type: FINISH_RESEARCH_TASK_TYPE,
        universe: universe!._id,
        data: {
          player: player!._id,
          research: research!._id,
          researchDuration,
          researchResourceCost
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

      const taskModel = getTaskModel<FinishResearchTaskType>()
      const task = await taskModel.create(finishResearchTask)

      // we process the task here
      await processTasks([task!], universe!)

      const processedTask = await taskRepository.findTaskById(task._id)

      expect(processedTask!.status).toBe(PROCESSED_TASK_STATUS)
      expect(processedTask!.isCancellable).toBe(false)
      expect(processedTask!.processedAt).toBe(universe?.lastProcessedTime)

      const researchPlayer = await playerRepository.findPlayerByUsername(
        PLAYER_TEST_1_PIRATE.username,
        universe!._id
      )

      expect(researchPlayer?.activeResearch).toBe(undefined)
      expect(researchPlayer?.researches[0].level).toBe(1)
      expect(researchPlayer?.researches[0].research.name).toEqual(research.name)

      // player points
      expect(researchPlayer?.points[0].points).toEqual(1_000)
      expect(researchPlayer?.points[0].origin).toEqual(research._id)
      expect(researchPlayer?.points[0].type).toEqual('Research')
      expect(researchPlayer?.points[0].second).toEqual(universe?.lastProcessedTime)

      // new troops population value
      expect(researchPlayer?.troopsPopulation).toBe(pirates.baseTroopsPopulation)
    })

    it('level 2 troops population research', async () => {
      const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)
      const player = await playerRepository.findPlayerByUsername(
        PLAYER_TEST_1_PIRATE.username,
        universe!._id
      )

      const research = player?.race.researches.find(
        (research) => research.name === PIRATE_TROOPS_POPULATION_RESEARCH.name
      ) as IResearchDocument

      const researchDuration = 1_000
      const researchResourceCost = 1_000

      player!.activeResearch = {
        research: research!._id,
        level: 1
      }

      await player?.save()

      const level1FinishResearchTask: ITask<FinishResearchTaskType> = {
        type: FINISH_RESEARCH_TASK_TYPE,
        universe: universe!._id,
        data: {
          player: player!._id,
          research: research!._id,
          researchDuration,
          researchResourceCost
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

      const taskModel = getTaskModel<FinishResearchTaskType>()
      const firstTask = await taskModel.create(level1FinishResearchTask)

      // we process the task here
      await processTasks([firstTask!], universe!)

      player!.activeResearch = {
        research: research!._id,
        level: 1
      }

      await player?.save()

      const level2FinishResearchTask: ITask<FinishResearchTaskType> = {
        type: FINISH_RESEARCH_TASK_TYPE,
        universe: universe!._id,
        data: {
          player: player!._id,
          research: research!._id,
          researchDuration,
          researchResourceCost
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

      const task = await taskModel.create(level2FinishResearchTask)

      // we process the task here
      await processTasks([task!], universe!)

      const processedTask = await taskRepository.findTaskById(task._id)

      expect(processedTask!.status).toBe(PROCESSED_TASK_STATUS)
      expect(processedTask!.isCancellable).toBe(false)
      expect(processedTask!.processedAt).toBe(universe?.lastProcessedTime)

      const researchPlayer = await playerRepository.findPlayerByUsername(
        PLAYER_TEST_1_PIRATE.username,
        universe!._id
      )

      expect(researchPlayer?.activeResearch).toBe(undefined)
      expect(researchPlayer?.researches[0].level).toBe(2)
      expect(researchPlayer?.researches[0].research.name).toEqual(research.name)

      // player points
      expect(researchPlayer?.points[0].points).toEqual(1_000)
      expect(researchPlayer?.points[0].origin).toEqual(research._id)
      expect(researchPlayer?.points[0].type).toEqual('Research')
      expect(researchPlayer?.points[0].second).toEqual(universe?.lastProcessedTime)
      expect(researchPlayer?.points[1].points).toEqual(1_000)
      expect(researchPlayer?.points[1].origin).toEqual(research._id)
      expect(researchPlayer?.points[1].type).toEqual('Research')
      expect(researchPlayer?.points[1].second).toEqual(universe?.lastProcessedTime)

      // new troops population value
      expect(researchPlayer?.troopsPopulation).toBe(22)
    })
  })

  it('task error if no valid player is present in the research data', async () => {
    const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)

    const researchDuration = 1_000
    const researchResourceCost = 1_000

    const finishResearchTask: ITask<FinishResearchTaskType> = {
      type: FINISH_RESEARCH_TASK_TYPE,
      universe: universe!._id,
      data: {
        // invalid playerId
        player: new mongoose.Types.ObjectId(),
        research: new mongoose.Types.ObjectId(),
        researchDuration,
        researchResourceCost
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

    const taskModel = getTaskModel<FinishResearchTaskType>()
    const task = await taskModel.create(finishResearchTask)

    // we process the task here
    await processTasks([task!], universe!)

    const processedTask = await taskRepository.findTaskById(task._id)

    expect(processedTask!.errorDetails).toBe('invalid player')
    expect(processedTask!.status).toBe(ERROR_TASK_STATUS)
  })

  it('task error if no valid research is present in the research data', async () => {
    const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)
    const player = await playerRepository.findPlayerByUsername(
      PLAYER_TEST_1_PIRATE.username,
      universe!._id
    )

    const researchDuration = 1_000
    const researchResourceCost = 1_000

    const finishResearchTask: ITask<FinishResearchTaskType> = {
      type: FINISH_RESEARCH_TASK_TYPE,
      universe: universe!._id,
      data: {
        player: player?.id,
        // invalid researchId
        research: new mongoose.Types.ObjectId(),
        researchDuration,
        researchResourceCost
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

    const taskModel = getTaskModel<FinishResearchTaskType>()
    const task = await taskModel.create(finishResearchTask)

    // we process the task here
    await processTasks([task!], universe!)

    const processedTask = await taskRepository.findTaskById(task._id)

    expect(processedTask!.errorDetails).toBe('invalid research')
    expect(processedTask!.status).toBe(ERROR_TASK_STATUS)
  })
})
