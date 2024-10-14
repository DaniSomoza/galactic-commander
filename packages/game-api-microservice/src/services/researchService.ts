import { ITask, StartResearchTaskType } from 'game-engine/dist/models/TaskModel'
import playerRepository from 'game-engine/dist/repositories/playerRepository'
import taskRepository from 'game-engine/dist/repositories/taskRepository'
import universeRepository from 'game-engine/dist/repositories/universeRepository'
import createStartResearchTask from 'game-engine/dist/engine/tasks/utils/createStartResearchTask'
import NotFoundError from 'auth-microservice/dist/errors/NotFoundError'
import BadRequestError from 'auth-microservice/dist/errors/BadRequestError'

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

  const research = player.race.researches.find((research) => research.name === researchName)

  if (!research) {
    throw new NotFoundError('invalid research', { researchName })
  }

  if (executeTaskAt && executeTaskAt < new Date().getTime()) {
    throw new BadRequestError('invalid schedule', { executeTaskAt })
  }

  const startResearchTask = createStartResearchTask(
    universe._id,
    player._id,
    research._id,
    executeTaskAt
  )

  const newTask = await taskRepository.createStartResearchTask(startResearchTask)

  return newTask
}

// TODO: ADD QUEUE ENDPOINT

const researchService = {
  startResearch
}

export default researchService
