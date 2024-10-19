import playerRepository from 'game-engine/dist/repositories/playerRepository'
import taskRepository from 'game-engine/dist/repositories/taskRepository'
import universeRepository from 'game-engine/dist/repositories/universeRepository'
import createStartResearchTask from 'game-engine/dist/engine/tasks/utils/createStartResearchTask'
import NotFoundError from 'auth-microservice/dist/errors/NotFoundError'
import BadRequestError from 'auth-microservice/dist/errors/BadRequestError'

import cleanPlayerFields from '../utils/cleanPlayerFields'
import { startResearchResponseType, updateResearchQueueResponseType } from '../types/Research'
import cleanTaskFields from '../utils/cleanTaskFields'

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
}: ResearchData): Promise<startResearchResponseType> {
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

  return { task: cleanTaskFields(newTask) }
}

type AddResearchToQueueData = {
  username: string
  researchQueue: string[]
  universeName: string
}

async function updateResearchQueue({
  username,
  researchQueue,
  universeName
}: AddResearchToQueueData): Promise<updateResearchQueueResponseType> {
  const universe = await universeRepository.findUniverseByName(universeName)
  const player = await playerRepository.findPlayerByUsername(username, universe!._id)

  if (!player || !universe) {
    throw new NotFoundError('invalid player', { username, universeName })
  }

  const isValidQueue = researchQueue.every((researchName) =>
    player.race.researches.some((research) => research.name === researchName)
  )

  if (!isValidQueue) {
    throw new NotFoundError('invalid research queue', { researchQueue })
  }

  // update player research queue
  player.researches.queue = researchQueue

  // TODO: if research queue is empty, just start research

  await player.save()

  return { player: cleanPlayerFields(player) }
}

const researchService = {
  startResearch,
  updateResearchQueue
}

export default researchService
