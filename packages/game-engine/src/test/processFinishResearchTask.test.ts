import mongoose from 'mongoose'

import PIRATE_FLEET_ATTACK_RESEARCH from '../assets/researches/pirates/pirate-fleet-attack-research'
import processTasks from '../engine/processTasks'
import getTaskModel from '../models/TaskModel'
import playerRepository from '../repositories/playerRepository'
import taskRepository from '../repositories/taskRepository'
import universeRepository from '../repositories/universeRepository'
import { PLAYER_TEST_1_PIRATE } from './mocks/playerMocks'
import UNIVERSE_TEST_MOCK from './mocks/universeMocks'
import PIRATE_FLEET_ENERGY_RESEARCH from '../assets/researches/pirates/pirate-fleet-energy-research'
import pirates from '../assets/races/pirates'
import PIRATE_TROOPS_POPULATION_RESEARCH from '../assets/researches/pirates/pirate-troops-population-research'
import {
  ERROR_TASK_STATUS,
  FINISH_RESEARCH_TASK_TYPE,
  FinishResearchTaskType,
  ITask,
  PENDING_TASK_STATUS,
  PROCESSED_TASK_STATUS
} from '../types/ITask'
import calculateMaxEnergy from '../engine/units/calculateMaxEnergy'
import calculateMaxPopulation from '../engine/units/calculateMaxPopulation'

const ENERGY_VALUE_LEVEL_0 = pirates.baseFleetEnergy
const ENERGY_VALUE_LEVEL_1 = 400
const ENERGY_VALUE_LEVEL_2 = 1_000

const POPULATION_VALUE_LEVEL_0 = pirates.baseTroopsPopulation
const POPULATION_VALUE_LEVEL_1 = 35
const POPULATION_VALUE_LEVEL_2 = 79

describe('process finish research task', () => {
  describe('finish bonus research task', () => {
    it('level 1 bonus research', async () => {
      const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)
      const player = await playerRepository.findPlayerByUsername(
        PLAYER_TEST_1_PIRATE.user.username,
        universe!._id
      )

      const research = player?.race.researches.find(
        (research) => research.name === PIRATE_FLEET_ATTACK_RESEARCH.name
      )

      const researchDuration = 1_000
      const researchResourceCost = 1_000

      const finishResearchTask: ITask<FinishResearchTaskType> = {
        type: FINISH_RESEARCH_TASK_TYPE,
        universe: universe!._id,
        data: {
          playerId: player!._id,
          researchId: research!._id,
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

      player!.researches.activeResearch = {
        research: research!,
        level: 1,
        executeTaskAt: new Date().getTime() + researchDuration,
        taskId: task._id
      }

      await player?.save()

      // we process the task here
      await processTasks([task!], universe!)

      const processedTask = await taskRepository.findTaskById(task._id)

      expect(processedTask!.status).toBe(PROCESSED_TASK_STATUS)
      expect(processedTask!.isCancellable).toBe(false)
      expect(processedTask!.processedAt).toBe(universe?.lastProcessedTime)

      const researchPlayer = await playerRepository.findPlayerByUsername(
        PLAYER_TEST_1_PIRATE.user.username,
        universe!._id
      )

      expect(researchPlayer?.researches.activeResearch).toBe(undefined)
      expect(researchPlayer?.researches.researched[0].level).toBe(1)
      expect(researchPlayer?.researches.researched[0].research.name).toEqual(research?.name)

      // TODO: player points
      // expect(researchPlayer?.points[0].points).toEqual(1_000)
      // expect(researchPlayer?.points[0].source).toEqual(research?._id)
      // expect(researchPlayer?.points[0].sourceName).toEqual(research?.name)
      // expect(researchPlayer?.points[0].type).toEqual('Research')
      // expect(researchPlayer?.points[0].second).toEqual(universe?.lastProcessedTime)

      // old player bonus
      expect(player?.perks).toEqual([])

      // FLEET_ATTACK_BONUS 10%
      expect(researchPlayer?.perks[0].bonus.FLEET_ATTACK_BONUS).toEqual(10)
      expect(researchPlayer?.perks[0].source).toEqual(research?._id)
      expect(researchPlayer?.perks[0].sourceName).toEqual(research?.name)
      expect(researchPlayer?.perks[0].type).toEqual('Research')
      expect(researchPlayer?.perks.length).toEqual(1)
    })

    it('level 2 bonus research', async () => {
      const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)
      const player = await playerRepository.findPlayerByUsername(
        PLAYER_TEST_1_PIRATE.user.username,
        universe!._id
      )

      const research = player?.race.researches.find(
        (research) => research.name === PIRATE_FLEET_ATTACK_RESEARCH.name
      )

      const researchDuration = 1_000
      const researchResourceCost = 1_000

      const finishLevel1ResearchTask: ITask<FinishResearchTaskType> = {
        type: FINISH_RESEARCH_TASK_TYPE,
        universe: universe!._id,
        data: {
          playerId: player!._id,
          researchId: research!._id,
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

      player!.researches.activeResearch = {
        research: research!,
        level: 1,
        executeTaskAt: new Date().getTime() + researchDuration,
        taskId: level1ResearchTask._id
      }

      await player?.save()

      // we process the task here
      await processTasks([level1ResearchTask!], universe!)

      const finishLevel2ResearchTask: ITask<FinishResearchTaskType> = {
        type: FINISH_RESEARCH_TASK_TYPE,
        universe: universe!._id,
        data: {
          playerId: player!._id,
          researchId: research!._id,
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

      player!.researches.activeResearch = {
        research: research!,
        level: 2,
        executeTaskAt: new Date().getTime() + researchDuration,
        taskId: task._id
      }

      await player?.save()

      // we process the task here
      await processTasks([task!], universe!)

      const processedTask = await taskRepository.findTaskById(task._id)

      expect(processedTask!.status).toBe(PROCESSED_TASK_STATUS)
      expect(processedTask!.isCancellable).toBe(false)
      expect(processedTask!.processedAt).toBe(universe?.lastProcessedTime)

      const researchPlayer = await playerRepository.findPlayerByUsername(
        PLAYER_TEST_1_PIRATE.user.username,
        universe!._id
      )

      expect(researchPlayer?.researches.activeResearch).toBe(undefined)
      expect(researchPlayer?.researches.researched[0].level).toBe(2)
      expect(researchPlayer?.researches.researched[0].research.name).toEqual(research?.name)

      // TODO: player points
      // expect(researchPlayer?.points[0].points).toEqual(1_000)
      // expect(researchPlayer?.points[0].source).toEqual(research?._id)
      // expect(researchPlayer?.points[0].sourceName).toEqual(research?.name)
      // expect(researchPlayer?.points[0].type).toEqual('Research')
      // expect(researchPlayer?.points[0].second).toEqual(universe?.lastProcessedTime)

      // expect(researchPlayer?.points[1].points).toEqual(1_000)
      // expect(researchPlayer?.points[1].source).toEqual(research?._id)
      // expect(researchPlayer?.points[1].sourceName).toEqual(research?.name)
      // expect(researchPlayer?.points[1].type).toEqual('Research')
      // expect(researchPlayer?.points[1].second).toEqual(universe?.lastProcessedTime)

      // old player bonus
      expect(player?.perks).toEqual([])

      // FLEET_ATTACK_BONUS 20%
      expect(researchPlayer?.perks[0].bonus.FLEET_ATTACK_BONUS).toEqual(20)
      expect(researchPlayer?.perks[0].source).toEqual(research?._id)
      expect(researchPlayer?.perks[0].sourceName).toEqual(research?.name)
      expect(researchPlayer?.perks[0].type).toEqual('Research')
      expect(researchPlayer?.perks.length).toEqual(1)
    })
  })

  describe('finish fleet energy research task', () => {
    it('level 1 fleet energy research', async () => {
      const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)
      const player = await playerRepository.findPlayerByUsername(
        PLAYER_TEST_1_PIRATE.user.username,
        universe!._id
      )

      const research = player?.race.researches.find(
        (research) => research.name === PIRATE_FLEET_ENERGY_RESEARCH.name
      )

      const researchDuration = 1_000
      const researchResourceCost = 1_000

      const finishResearchTask: ITask<FinishResearchTaskType> = {
        type: FINISH_RESEARCH_TASK_TYPE,
        universe: universe!._id,
        data: {
          playerId: player!._id,
          researchId: research!._id,
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

      player!.researches.activeResearch = {
        research: research!,
        level: 1,
        executeTaskAt: new Date().getTime() + researchDuration,
        taskId: task._id
      }

      await player?.save()

      const energyResearch = player!.researches.researched.find(
        ({ research }) => research.isFleetEnergyResearch
      )
      const currentEnergyLevel = energyResearch?.level || 0

      expect(calculateMaxEnergy(player!.race, currentEnergyLevel)).toBe(ENERGY_VALUE_LEVEL_0)

      // we process the task here
      await processTasks([task!], universe!)

      const processedTask = await taskRepository.findTaskById(task._id)

      expect(processedTask!.status).toBe(PROCESSED_TASK_STATUS)
      expect(processedTask!.isCancellable).toBe(false)
      expect(processedTask!.processedAt).toBe(universe?.lastProcessedTime)

      const researchPlayer = await playerRepository.findPlayerByUsername(
        PLAYER_TEST_1_PIRATE.user.username,
        universe!._id
      )

      expect(researchPlayer?.researches.activeResearch).toBe(undefined)
      expect(researchPlayer?.researches.researched[0].level).toBe(1)
      expect(researchPlayer?.researches.researched[0].research.name).toEqual(research?.name)

      // TODO: player points
      // expect(researchPlayer?.points[0].points).toEqual(1_000)
      // expect(researchPlayer?.points[0].source).toEqual(research?._id)
      // expect(researchPlayer?.points[0].sourceName).toEqual(research?.name)
      // expect(researchPlayer?.points[0].type).toEqual('Research')
      // expect(researchPlayer?.points[0].second).toEqual(universe?.lastProcessedTime)

      // new energy
      expect(
        calculateMaxEnergy(researchPlayer!.race, researchPlayer!.researches.researched[0].level)
      ).toBe(ENERGY_VALUE_LEVEL_1)
    })

    it('level 2 fleet energy research', async () => {
      const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)
      const player = await playerRepository.findPlayerByUsername(
        PLAYER_TEST_1_PIRATE.user.username,
        universe!._id
      )

      const research = player?.race.researches.find(
        (research) => research.name === PIRATE_FLEET_ENERGY_RESEARCH.name
      )

      const researchDuration = 1_000
      const researchResourceCost = 1_000

      const level1FinishResearchTask: ITask<FinishResearchTaskType> = {
        type: FINISH_RESEARCH_TASK_TYPE,
        universe: universe!._id,
        data: {
          playerId: player!._id,
          researchId: research!._id,
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

      player!.researches.activeResearch = {
        research: research!,
        level: 1,
        executeTaskAt: new Date().getTime() + researchDuration,
        taskId: firstTask._id
      }

      await player?.save()

      // we process the task here
      await processTasks([firstTask!], universe!)

      const level2FinishResearchTask: ITask<FinishResearchTaskType> = {
        type: FINISH_RESEARCH_TASK_TYPE,
        universe: universe!._id,
        data: {
          playerId: player!._id,
          researchId: research!._id,
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

      player!.researches.activeResearch = {
        research: research!,
        level: 1,
        executeTaskAt: new Date().getTime() + researchDuration,
        taskId: task._id
      }

      await player?.save()

      // we process the task here
      await processTasks([task!], universe!)

      const processedTask = await taskRepository.findTaskById(task._id)

      expect(processedTask!.status).toBe(PROCESSED_TASK_STATUS)
      expect(processedTask!.isCancellable).toBe(false)
      expect(processedTask!.processedAt).toBe(universe?.lastProcessedTime)

      const researchPlayer = await playerRepository.findPlayerByUsername(
        PLAYER_TEST_1_PIRATE.user.username,
        universe!._id
      )

      expect(researchPlayer?.researches.activeResearch).toBe(undefined)
      expect(researchPlayer?.researches.researched[0].level).toBe(2)
      expect(researchPlayer?.researches.researched[0].research.name).toEqual(research?.name)

      // TODO: player points
      // expect(researchPlayer?.points[0].points).toEqual(1_000)
      // expect(researchPlayer?.points[0].source).toEqual(research?._id)
      // expect(researchPlayer?.points[0].sourceName).toEqual(research?.name)
      // expect(researchPlayer?.points[0].type).toEqual('Research')
      // expect(researchPlayer?.points[0].second).toEqual(universe?.lastProcessedTime)
      // expect(researchPlayer?.points[1].points).toEqual(1_000)
      // expect(researchPlayer?.points[1].source).toEqual(research?._id)
      // expect(researchPlayer?.points[1].sourceName).toEqual(research?.name)
      // expect(researchPlayer?.points[1].type).toEqual('Research')
      // expect(researchPlayer?.points[1].second).toEqual(universe?.lastProcessedTime)

      // new energy
      expect(
        calculateMaxEnergy(researchPlayer!.race, researchPlayer!.researches.researched[0].level)
      ).toBe(ENERGY_VALUE_LEVEL_2)
    })
  })

  describe('finish troops population research task', () => {
    it('level 1 troops population research', async () => {
      const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)
      const player = await playerRepository.findPlayerByUsername(
        PLAYER_TEST_1_PIRATE.user.username,
        universe!._id
      )

      const research = player?.race.researches.find(
        (research) => research.name === PIRATE_TROOPS_POPULATION_RESEARCH.name
      )

      const researchDuration = 1_000
      const researchResourceCost = 1_000

      const finishResearchTask: ITask<FinishResearchTaskType> = {
        type: FINISH_RESEARCH_TASK_TYPE,
        universe: universe!._id,
        data: {
          playerId: player!._id,
          researchId: research!._id,
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

      player!.researches.activeResearch = {
        research: research!,
        level: 1,
        executeTaskAt: new Date().getTime() + researchDuration,
        taskId: task._id
      }

      await player?.save()

      const populationResearch = player!.researches.researched.find(
        ({ research }) => research.isTroopsPopulationResearch
      )
      const currentPopulationLevel = populationResearch?.level || 0

      expect(calculateMaxPopulation(player!.race, currentPopulationLevel)).toBe(
        POPULATION_VALUE_LEVEL_0
      )

      // we process the task here
      await processTasks([task!], universe!)

      const processedTask = await taskRepository.findTaskById(task._id)

      expect(processedTask!.status).toBe(PROCESSED_TASK_STATUS)
      expect(processedTask!.isCancellable).toBe(false)
      expect(processedTask!.processedAt).toBe(universe?.lastProcessedTime)

      const researchPlayer = await playerRepository.findPlayerByUsername(
        PLAYER_TEST_1_PIRATE.user.username,
        universe!._id
      )

      expect(researchPlayer?.researches.activeResearch).toBe(undefined)
      expect(researchPlayer?.researches.researched[0].level).toBe(1)
      expect(researchPlayer?.researches.researched[0].research.name).toEqual(research?.name)

      // TODO: player points
      // expect(researchPlayer?.points[0].points).toEqual(1_000)
      // expect(researchPlayer?.points[0].source).toEqual(research?._id)
      // expect(researchPlayer?.points[0].sourceName).toEqual(research?.name)
      // expect(researchPlayer?.points[0].type).toEqual('Research')
      // expect(researchPlayer?.points[0].second).toEqual(universe?.lastProcessedTime)

      // new troops population value
      expect(
        calculateMaxPopulation(researchPlayer!.race, researchPlayer!.researches.researched[0].level)
      ).toBe(POPULATION_VALUE_LEVEL_1)
    })

    it('level 2 troops population research', async () => {
      const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)
      const player = await playerRepository.findPlayerByUsername(
        PLAYER_TEST_1_PIRATE.user.username,
        universe!._id
      )

      const research = player?.race.researches.find(
        (research) => research.name === PIRATE_TROOPS_POPULATION_RESEARCH.name
      )

      const researchDuration = 1_000
      const researchResourceCost = 1_000

      await player?.save()

      const level1FinishResearchTask: ITask<FinishResearchTaskType> = {
        type: FINISH_RESEARCH_TASK_TYPE,
        universe: universe!._id,
        data: {
          playerId: player!._id,
          researchId: research!._id,
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

      const level2FinishResearchTask: ITask<FinishResearchTaskType> = {
        type: FINISH_RESEARCH_TASK_TYPE,
        universe: universe!._id,
        data: {
          playerId: player!._id,
          researchId: research!._id,
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

      player!.researches.activeResearch = {
        research: research!,
        level: 1,
        executeTaskAt: new Date().getTime() + researchDuration,
        taskId: task._id
      }

      await player?.save()

      // we process the task here
      await processTasks([task!], universe!)

      const processedTask = await taskRepository.findTaskById(task._id)

      expect(processedTask!.status).toBe(PROCESSED_TASK_STATUS)
      expect(processedTask!.isCancellable).toBe(false)
      expect(processedTask!.processedAt).toBe(universe?.lastProcessedTime)

      const researchPlayer = await playerRepository.findPlayerByUsername(
        PLAYER_TEST_1_PIRATE.user.username,
        universe!._id
      )

      expect(researchPlayer?.researches.activeResearch).toBe(undefined)
      expect(researchPlayer?.researches.researched[0].level).toBe(2)
      expect(researchPlayer?.researches.researched[0].research.name).toEqual(research?.name)

      // TODO: player points
      // expect(researchPlayer?.points[0].points).toEqual(1_000)
      // expect(researchPlayer?.points[0].source).toEqual(research?._id)
      // expect(researchPlayer?.points[0].sourceName).toEqual(research?.name)
      // expect(researchPlayer?.points[0].type).toEqual('Research')
      // expect(researchPlayer?.points[0].second).toEqual(universe?.lastProcessedTime)
      // expect(researchPlayer?.points[1].points).toEqual(1_000)
      // expect(researchPlayer?.points[1].source).toEqual(research?._id)
      // expect(researchPlayer?.points[1].sourceName).toEqual(research?.name)
      // expect(researchPlayer?.points[1].type).toEqual('Research')
      // expect(researchPlayer?.points[1].second).toEqual(universe?.lastProcessedTime)

      // new troops population value
      expect(
        calculateMaxPopulation(researchPlayer!.race, researchPlayer!.researches.researched[0].level)
      ).toBe(POPULATION_VALUE_LEVEL_2)
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
        playerId: new mongoose.Types.ObjectId(),
        researchId: new mongoose.Types.ObjectId(),
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
      PLAYER_TEST_1_PIRATE.user.username,
      universe!._id
    )

    const researchDuration = 1_000
    const researchResourceCost = 1_000

    const finishResearchTask: ITask<FinishResearchTaskType> = {
      type: FINISH_RESEARCH_TASK_TYPE,
      universe: universe!._id,
      data: {
        playerId: player?.id,
        // invalid researchId
        researchId: new mongoose.Types.ObjectId(),
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
