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

  if (!universe) {
    throw new NotFoundError('invalid universe', { universeName })
  }

  const universeId = universe._id.toString()

  const player = await playerRepository.findPlayerByUsername(username, universeId)

  if (!player) {
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
    universeId,
    player._id.toString(),
    research._id.toString(),
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

  if (!universe) {
    throw new NotFoundError('invalid universe', { universeName })
  }

  const universeId = universe._id.toString()

  const player = await playerRepository.findPlayerByUsername(username, universeId)

  if (!player) {
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

  if (!player.researches.activeResearch) {
    // if no research is active, just start the first research in the queue
    const nextResearchName = player.researches.queue.shift()
    if (nextResearchName) {
      await startResearch({
        username,
        researchName: nextResearchName,
        universeName
      })
    }
  }

  await player.save()

  return { player: cleanPlayerFields(player) }
}

const researchService = {
  startResearch,
  updateResearchQueue
}

export default researchService
