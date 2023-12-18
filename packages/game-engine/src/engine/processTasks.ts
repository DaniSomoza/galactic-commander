import groupTasksBySeconds from '../helpers/groupTasksBySeconds'
import { ITaskDocument } from '../models/TaskModel'
import { IUniverse } from '../models/UniverseModel'

async function processTasks(tasks: ITaskDocument[], currentSecond: number, universe: IUniverse) {
  console.log('universe: ', universe)
  console.log('currentSecond: ', currentSecond)
  console.log('tasks to process: ', tasks.length)

  const tasksGroupedBySeconds = groupTasksBySeconds(tasks, universe)

  console.log('tasksGroupedBySeconds: ', tasksGroupedBySeconds)

  const orderedSecondsToProcess = Object.keys(tasksGroupedBySeconds).sort(
    (a, b) => Number(a) - Number(b)
  )

  console.log('orderedSecondsToProcess: ', orderedSecondsToProcess)

  orderedSecondsToProcess.map((secondToProcess) => {
    console.log('secondToProcess: ', secondToProcess)
    // TODO: for each second Calculate resource Production for each player
    // TODO: for each second process Tasks by priority type
  })
}

export default processTasks
