import mongoose from 'mongoose'

import PIRATE_FLEET_ATTACK_RESEARCH from '../assets/researches/pirates/pirate-fleet-attack-research'
import processTasks from '../engine/processTasks'
import { IResearchDocument } from '../models/ResearchModel'
import getTaskModel, {
  ITask,
  PENDING_TASK_STATUS,
  StartResearchTaskType,
  FinishResearchTaskData,
  START_RESEARCH_TASK_TYPE,
  FINISH_RESEARCH_TASK_TYPE,
  ERROR_TASK_STATUS
} from '../models/TaskModel'
import playerRepository from '../repositories/playerRepository'
import taskRepository from '../repositories/taskRepository'
import universeRepository from '../repositories/universeRepository'
import { PLAYER_TEST_1_PIRATE } from './mocks/playerMocks'
import UNIVERSE_TEST_MOCK from './mocks/universeMocks'
import { IPlanetDocument } from '../models/PlanetModel'

describe('process start research task', () => {
  it('process a valid start research task', async () => {
    const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)
    const player = await playerRepository.findPlayerByUsername(
      PLAYER_TEST_1_PIRATE.username,
      universe!._id
    )

    const research = player?.race.researches.find(
      (research) => research.name === PIRATE_FLEET_ATTACK_RESEARCH.name
    ) as IResearchDocument

    // TODO: implement createBaseTask helper function
    const startResearchTask: ITask<StartResearchTaskType> = {
      type: START_RESEARCH_TASK_TYPE,
      universe: universe!._id,
      data: {
        player: player!._id,
        research: research!._id
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

    const [finishResearchTasks] = await taskRepository.getPendingTasksByUniverse(
      universe!._id,
      new Date().getTime()
    )

    const playerResearch = await playerRepository.findPlayerById(player!._id)

    expect((playerResearch?.activeResearch?.research as IResearchDocument)._id).toEqual(
      research._id
    )
    expect(playerResearch?.activeResearch?.level).toEqual(1)

    // TODO: ADD expect(processedTask!.status).toBe(PROCESSED_TASK_STATUS)

    expect(finishResearchTasks!.type).toBe(FINISH_RESEARCH_TASK_TYPE)
    expect(finishResearchTasks!.status).toBe(PENDING_TASK_STATUS)
    expect(finishResearchTasks!.isCancellable).toBe(true)

    const finishResearchTasksData = finishResearchTasks!.data as FinishResearchTaskData

    expect(finishResearchTasksData.player).toEqual(player?._id)
    expect(finishResearchTasksData.research).toEqual(research._id)
    expect(finishResearchTasksData.researchDuration).toEqual(23000)
    expect(finishResearchTasksData.researchResourceCost).toEqual(200)
    expect(finishResearchTasks!.executeTaskAt).toEqual(24000)
    expect(finishResearchTasks!.errorDetails).toEqual(null)
  })

  it('task error if no valid player is present in the research data', async () => {
    const universe = await universeRepository.findUniverseByName(UNIVERSE_TEST_MOCK.name)
    const player = await playerRepository.findPlayerByUsername(
      PLAYER_TEST_1_PIRATE.username,
      universe!._id
    )

    const research = player?.race.researches.find(
      (research) => research.name === PIRATE_FLEET_ATTACK_RESEARCH.name
    ) as IResearchDocument

    const startResearchTask: ITask<StartResearchTaskType> = {
      type: START_RESEARCH_TASK_TYPE,
      universe: universe!._id,
      data: {
        // invalid playerId
        player: new mongoose.Types.ObjectId(),
        research: research!._id
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
    const player = await playerRepository.findPlayerByUsername(
      PLAYER_TEST_1_PIRATE.username,
      universe!._id
    )

    const research = player?.race.researches.find(
      (research) => research.name === PIRATE_FLEET_ATTACK_RESEARCH.name
    ) as IResearchDocument

    const startResearchTask: ITask<StartResearchTaskType> = {
      type: START_RESEARCH_TASK_TYPE,
      universe: universe!._id,
      data: {
        player: player!._id,
        research: research!._id
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
    const player = await playerRepository.findPlayerByUsername(
      PLAYER_TEST_1_PIRATE.username,
      universe!._id
    )

    const startResearchTask: ITask<StartResearchTaskType> = {
      type: START_RESEARCH_TASK_TYPE,
      universe: universe!._id,
      data: {
        player: player!._id,
        // invalid researchId
        research: new mongoose.Types.ObjectId()
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
    const player = await playerRepository.findPlayerByUsername(
      PLAYER_TEST_1_PIRATE.username,
      universe!._id
    )

    const research = player?.race.researches.find(
      (research) => research.name === PIRATE_FLEET_ATTACK_RESEARCH.name
    ) as IResearchDocument

    // update planet resources
    player!.principalPlanet.resources = 0

    await (player!.principalPlanet as IPlanetDocument).save()

    // TODO: implement createBaseTask helper function
    const startResearchTask: ITask<StartResearchTaskType> = {
      type: START_RESEARCH_TASK_TYPE,
      universe: universe!._id,
      data: {
        player: player!._id,
        research: research!._id
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
