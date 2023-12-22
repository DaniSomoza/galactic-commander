import taskRepository from '../repositories/taskRepository'
import getSecond from '../helpers/getSecond'
import processTasks from './processTasks'
import { IUniverseDocument } from '../models/UniverseModel'

async function processUniverse(universe: IUniverseDocument) {
  const timestamp = new Date().getTime()
  const currentSecond = getSecond(timestamp)
  const universeId = universe._id

  if (!universe.isProcessingInProgress) {
    console.log(`---[${currentSecond}]---`)
    const tasks = await taskRepository.getPendingTasksByUniverse(universeId, currentSecond)
    const hasTasksToProcess = tasks.length > 0

    console.log('tasks: ', tasks.length)
    universe.isProcessingInProgress = true
    await universe.save()

    if (hasTasksToProcess) {
      await processTasks(tasks, universe)
    }

    universe.isProcessingInProgress = false
    universe.lastProcessedTime = currentSecond
    await universe.save()

    console.log(`---[END]---`)
  }
}

export default processUniverse
