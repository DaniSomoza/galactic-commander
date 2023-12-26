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
    console.log(`[${currentSecond}] [${formatDate(currentSecond)}] --- tasks: ${tasks.length}`)
    const hasTasksToProcess = tasks.length > 0

    if (hasTasksToProcess) {
      universe.isProcessingInProgress = true
      await universe.save()

      await processTasks(tasks, universe)
    }

    universe.isProcessingInProgress = false
    universe.lastProcessedTime = currentSecond
    await universe.save()
  }
}

export default processUniverse

function formatDate(timestamp: number) {
  return new Intl.DateTimeFormat('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  }).format(new Date(timestamp))
}
