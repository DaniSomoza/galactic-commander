import { ITaskDocument } from '../models/TaskModel'
import { IUniverse } from '../models/UniverseModel'

// TODO: implement sort here!

type GroupTasksType = Record<number, ITaskDocument[]>

function groupTasksBySeconds(tasks: ITaskDocument[], universe: IUniverse): GroupTasksType {
  return tasks.reduce<GroupTasksType>((groupedTasks, task) => {
    const second = task.executeTaskAt || universe.lastProcessedTime

    groupedTasks[second] = groupedTasks[second] || []
    groupedTasks[second] = [...groupedTasks[second], task]

    return groupedTasks
  }, {})
}

export default groupTasksBySeconds
