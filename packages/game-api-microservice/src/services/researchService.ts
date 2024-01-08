import {
  ITask,
  StartResearchTaskType,
  PENDING_TASK_STATUS,
  START_RESEARCH_TASK_TYPE
} from 'game-engine/dist/models/TaskModel'
import { IResearchDocument } from 'game-engine/dist/models/ResearchModel'
import playerRepository from 'game-engine/dist/repositories/playerRepository'
import taskRepository from 'game-engine/dist/repositories/taskRepository'
import universeRepository from 'game-engine/dist/repositories/universeRepository'
import getSecond from 'game-engine/dist/helpers/getSecond'
import NotFoundError from 'auth-microservice/dist/errors/NotFoundError'

type ResearchData = {
  username: string
  researchName: string
  universeName: string
  executeTaskAt?: number
}

async function startResearch({
  username,
  researchName,
  universeName,
  executeTaskAt
}: ResearchData): Promise<ITask<StartResearchTaskType>> {
  const universe = await universeRepository.findUniverseByName(universeName)
  const player = await playerRepository.findPlayerByUsername(username, universe!._id)

  if (!player || !universe) {
    throw new NotFoundError('invalid player', { username, universeName })
  }

  const raceResearches = player.race.researches as IResearchDocument[]
  const research = raceResearches.find((research) => research.name === researchName)

  if (!research) {
    throw new NotFoundError('invalid research', { researchName })
  }

  if (executeTaskAt && executeTaskAt < new Date().getTime()) {
    throw new NotFoundError('invalid schedule', { executeTaskAt })
  }

  // TODO: create base Task
  const startResearchTask: ITask<StartResearchTaskType> = {
    type: START_RESEARCH_TASK_TYPE,
    universe: universe._id,
    data: {
      player: player._id,
      research: research._id
    },

    status: PENDING_TASK_STATUS,
    isCancellable: false,

    executeTaskAt: executeTaskAt ? getSecond(executeTaskAt) : null,
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

  const newTask = await taskRepository.createStartResearchTask(startResearchTask)

  return newTask
}

const researchService = {
  startResearch
}

export default researchService
