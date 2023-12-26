import { Document } from 'mongoose'
import {
  TaskType,
  ITaskTypeDocument,
  RESEARCH_TASK_TYPE,
  NEW_PLAYER_TASK_TYPE
} from '../../models/TaskModel'
import processResearchTask from './processResearchTask'
import processNewPlayerTask from './processNewPlayerTask'

type taskPriority = {
  [Type in TaskType]: number
}

const TASK_PRIORITY: taskPriority = {
  [NEW_PLAYER_TASK_TYPE]: 1,
  [RESEARCH_TASK_TYPE]: 2
}

export type TaskHandler<Type extends TaskType> = (
  task: ITaskTypeDocument<Type>,
  second: number
) => Promise<Document[]>

type TaskHandlerType = {
  [Type in TaskType]: {
    handler: TaskHandler<Type>
    priority: taskPriority[Type]
    processTasksInParallel: boolean
  }
}

export const TASK_HANDLER: TaskHandlerType = {
  [NEW_PLAYER_TASK_TYPE]: {
    processTasksInParallel: false,
    handler: processNewPlayerTask,
    priority: TASK_PRIORITY[NEW_PLAYER_TASK_TYPE]
  },
  [RESEARCH_TASK_TYPE]: {
    processTasksInParallel: true,
    handler: processResearchTask,
    priority: TASK_PRIORITY[RESEARCH_TASK_TYPE]
  }
}
