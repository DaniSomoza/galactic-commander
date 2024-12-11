import { ITaskDocument, ITaskTypeDocument } from '../models/TaskModel'
import { TaskType } from '../types/ITask'
import { IUniverse } from '../types/IUniverse'

type GroupedTaskItem<Type extends TaskType> = { second: number; tasks: ITaskTypeDocument<Type>[] }
type GroupOfTasksType = GroupedTaskItem<TaskType>[]

function groupTasksBySeconds(tasks: ITaskDocument[], universe: IUniverse): GroupOfTasksType {
  // from [...tasks]
  // to { second2: [tasks], second1: [tasks], ...}
  const groupedTasksBySeconds = tasks.reduce<Record<number, ITaskDocument[]>>(
    (groupedTasks, task) => {
      const second = task.executeTaskAt || universe.lastProcessedTime

      groupedTasks[second] = groupedTasks[second] || []
      groupedTasks[second].push(task)

      return groupedTasks
    },
    {}
  )
  // from { second2: [tasks], second1: [tasks]...}
  // to [ { second: second1, tasks: [tasks] }, { second2, tasks: [tasks] }... ]
  const groupedTasksOrdered = Object.keys(groupedTasksBySeconds)
    .sort((a, b) => Number(a) - Number(b))
    .map((second) => ({
      second: Number(second),
      tasks: groupedTasksBySeconds[Number(second)]
    }))

  return groupedTasksOrdered
}

export default groupTasksBySeconds
