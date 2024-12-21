import mongoose from 'mongoose'

import PIRATE_FLEET_ATTACK_RESEARCH from '../assets/researches/pirates/pirate-fleet-attack-research'
import processTasks from '../engine/processTasks'
import { IResearchDocument } from '../models/ResearchModel'
import getTaskModel from '../models/TaskModel'
import playerRepository from '../repositories/playerRepository'
import taskRepository from '../repositories/taskRepository'
import universeRepository from '../repositories/universeRepository'
import { PLAYER_TEST_1_PIRATE } from './mocks/playerMocks'
import UNIVERSE_TEST_MOCK from './mocks/universeMocks'
import {
  ERROR_TASK_STATUS,
  FINISH_RESEARCH_TASK_TYPE,
  FinishResearchTaskData,
  ITask,
  PENDING_TASK_STATUS,
  START_RESEARCH_TASK_TYPE,
  StartResearchTaskType
} from '../types/ITask'

describe('process start research task', () => {
  it('process a valid start research task', async () => {
    const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)
    const universeId = universe!._id.toString()

    const player = await playerRepository.findPlayerByUsername(
      PLAYER_TEST_1_PIRATE.user.username,
      universeId
    )

    const research = player?.race.researches.find(
      (research) => research.name === PIRATE_FLEET_ATTACK_RESEARCH.name
    )

    // TODO: implement createBaseTask helper function
    const startResearchTask: ITask<StartResearchTaskType> = {
      type: START_RESEARCH_TASK_TYPE,
      universeId,
      data: {
        playerId: player!._id.toString(),
        researchId: research!._id.toString()
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

    const taskModel = getTaskModel<StartResearchTaskType>()
    const task = await taskModel.create(startResearchTask)

    // we process the task here
    await processTasks([task!], universe!)

    const [finishResearchTasks] = await taskRepository.getPendingTasks(
      universe!._id,
      new Date().getTime()
    )

    const playerResearch = await playerRepository.findPlayerById(player!._id.toString())

    expect((playerResearch?.researches.activeResearch?.research as IResearchDocument)._id).toEqual(
      research!._id
    )
    expect(playerResearch?.researches.activeResearch?.level).toEqual(1)

    // TODO: ADD expect(processedTask!.status).toBe(PROCESSED_TASK_STATUS)

    expect(finishResearchTasks!.type).toBe(FINISH_RESEARCH_TASK_TYPE)
    expect(finishResearchTasks!.status).toBe(PENDING_TASK_STATUS)
    expect(finishResearchTasks!.isCancellable).toBe(true)

    const finishResearchTasksData = finishResearchTasks!.data as FinishResearchTaskData

    expect(finishResearchTasksData.playerId).toEqual(player?._id.toString())
    expect(finishResearchTasksData.researchId).toEqual(research?._id.toString())
    expect(finishResearchTasksData.researchDuration).toEqual(23000)
    expect(finishResearchTasksData.researchResourceCost).toEqual(200)
    expect(finishResearchTasks!.executeTaskAt).toEqual(24000)
    expect(finishResearchTasks!.errorDetails).toEqual(null)
  })

  it('task error if no valid player is present in the research data', async () => {
    const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)
    const universeId = universe!._id.toString()

    const player = await playerRepository.findPlayerByUsername(
      PLAYER_TEST_1_PIRATE.user.username,
      universeId
    )

    const research = player?.race.researches.find(
      (research) => research.name === PIRATE_FLEET_ATTACK_RESEARCH.name
    ) as IResearchDocument

    const startResearchTask: ITask<StartResearchTaskType> = {
      type: START_RESEARCH_TASK_TYPE,
      universeId,
      data: {
        // invalid playerId
        playerId: new mongoose.Types.ObjectId().toString(),
        researchId: research!._id.toString()
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

    const taskModel = getTaskModel<StartResearchTaskType>()
    const task = await taskModel.create(startResearchTask)

    // we process the invalid task here
    await processTasks([task!], universe!)

    const processedTask = await taskRepository.findTaskById(task._id)

    expect(processedTask!.errorDetails).toBe('invalid player')
    expect(processedTask!.status).toBe(ERROR_TASK_STATUS)
  })

  it('task error if player is already researching ', async () => {
    const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)
    const universeId = universe!._id.toString()

    const player = await playerRepository.findPlayerByUsername(
      PLAYER_TEST_1_PIRATE.user.username,
      universeId
    )

    const research = player?.race.researches.find(
      (research) => research.name === PIRATE_FLEET_ATTACK_RESEARCH.name
    ) as IResearchDocument

    const startResearchTask: ITask<StartResearchTaskType> = {
      type: START_RESEARCH_TASK_TYPE,
      universeId,
      data: {
        playerId: player!._id.toString(),
        researchId: research!._id.toString()
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

    const taskModel = getTaskModel<StartResearchTaskType>()
    const task = await taskModel.create(startResearchTask)

    // we process the task here
    await processTasks([task!], universe!)

    // we try to research again
    const duplicatedResearchTask = await taskModel.create(startResearchTask)
    await processTasks([duplicatedResearchTask!], universe!)

    const processedTask = await taskRepository.findTaskById(duplicatedResearchTask._id)
    expect(processedTask!.errorDetails).toBe('player already researching')
    expect(processedTask!.status).toBe(ERROR_TASK_STATUS)
  })

  it('task error if no valid research is present in the research data', async () => {
    const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)
    const universeId = universe!._id.toString()

    const player = await playerRepository.findPlayerByUsername(
      PLAYER_TEST_1_PIRATE.user.username,
      universeId
    )

    const startResearchTask: ITask<StartResearchTaskType> = {
      type: START_RESEARCH_TASK_TYPE,
      universeId,
      data: {
        playerId: player!._id.toString(),
        // invalid researchId
        researchId: new mongoose.Types.ObjectId().toString()
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

    const taskModel = getTaskModel<StartResearchTaskType>()
    const task = await taskModel.create(startResearchTask)

    // we process the invalid task here
    await processTasks([task!], universe!)

    const processedTask = await taskRepository.findTaskById(task._id)

    expect(processedTask!.errorDetails).toBe('invalid research')
    expect(processedTask!.status).toBe(ERROR_TASK_STATUS)
  })

  it('task error if no resources available in the principal planet', async () => {
    const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)
    const universeId = universe!._id.toString()

    const player = await playerRepository.findPlayerByUsername(
      PLAYER_TEST_1_PIRATE.user.username,
      universeId
    )

    const research = player?.race.researches.find(
      (research) => research.name === PIRATE_FLEET_ATTACK_RESEARCH.name
    ) as IResearchDocument

    // update planet resources
    player!.planets.principal.resources = 0
    await player!.planets.principal.save()

    // TODO: implement createBaseTask helper function
    const startResearchTask: ITask<StartResearchTaskType> = {
      type: START_RESEARCH_TASK_TYPE,
      universeId,
      data: {
        playerId: player!._id.toString(),
        researchId: research!._id.toString()
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

    const taskModel = getTaskModel<StartResearchTaskType>()
    const task = await taskModel.create(startResearchTask)

    // we process the task here
    await processTasks([task!], universe!)

    const processedTask = await taskRepository.findTaskById(task._id)

    expect(processedTask!.errorDetails).toBe('no resources available')
    expect(processedTask!.status).toBe(ERROR_TASK_STATUS)
  })
})
