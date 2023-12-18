import taskRepository from '../repositories/taskRepository'
import getSecond from '../helpers/getSecond'
import processTasks from './processTasks'
import { IUniverseDocument } from '../models/UniverseModel'

async function processUniverse(universe: IUniverseDocument) {
  const timestamp = new Date().getTime()
  const currentSecond = getSecond(timestamp)
  const universeId = universe._id

  if (!universe.isProcessingInProgress) {
    const tasks = await taskRepository.getPendingTasksByUniverse(universeId, currentSecond)
    const hasTasksToProcess = tasks.length > 0

    if (hasTasksToProcess) {
      console.log(`---[${currentSecond}]---`)

      universe.isProcessingInProgress = true
      await universe.save()

      await processTasks(tasks, currentSecond, universe)

      universe.isProcessingInProgress = false
      universe.lastProcessedTime = currentSecond
      await universe.save()
      console.log(`---[END]---`)
    }
  }
}

export default processUniverse
