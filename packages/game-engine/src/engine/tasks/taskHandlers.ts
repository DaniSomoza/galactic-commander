import { Document } from 'mongoose'
import {
  TaskType,
  ITaskTypeDocument,
  NEW_PLAYER_TASK_TYPE,
  FINISH_RESEARCH_TASK_TYPE,
  START_RESEARCH_TASK_TYPE
} from '../../models/TaskModel'
import processNewPlayerTask from './processNewPlayerTask'
import processFinishResearchTask from './processFinishResearchTask'
import processStartResearchTask from './processStartResearchTask'

type taskPriority = {
  [Type in TaskType]: number
}

const TASK_PRIORITY: taskPriority = {
  [NEW_PLAYER_TASK_TYPE]: 1,
  [FINISH_RESEARCH_TASK_TYPE]: 2,
  [START_RESEARCH_TASK_TYPE]: 3
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
  [FINISH_RESEARCH_TASK_TYPE]: {
    processTasksInParallel: true,
    handler: processFinishResearchTask,
    priority: TASK_PRIORITY[FINISH_RESEARCH_TASK_TYPE]
  },
  [START_RESEARCH_TASK_TYPE]: {
    processTasksInParallel: true,
    handler: processStartResearchTask,
    priority: TASK_PRIORITY[START_RESEARCH_TASK_TYPE]
  }
}
