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
  // [CREATE_ALLIANCE_TASK_TYPE]: XXX,
  // [JOIN_ALLIANCE_TASK_TYPE]: XXX,
  // [LEAVE_ALLIANCE_TASK_TYPE]: XXX,
  // [RESTORE_SPECIAL_TASK_TYPE]: 2,
  // [ACTIVATE_SPECIAL_TASK_TYPE]: 3,
  [FINISH_RESEARCH_TASK_TYPE]: 2,
  [START_RESEARCH_TASK_TYPE]: 3
  // [FINISH_BUILD_UNITS_TASK_TYPE]: 6,
  // [START_BUILD_UNITS_TASK_TYPE]: 7,
  // [FINISH_FLEET_TASK_TYPE]: 8, // <== Process all battles here!!
  // [START_FLEET_TASK_TYPE]: 9
}

// fleet types priority (finish)
// {
//  [FINISH_COLONIZATION_FLEET_TASK_TYPE]: 1,
//  [FINISH_DEPLOYMENT_FLEET_TASK_TYPE]: 1,
//  [FINISH_TRANSPORT_FLEET_TASK_TYPE]: 1, // transport resource or troops to a planet
//  [FINISH_COLLECT_RESOURCES_FLEET_TASK_TYPE]: 1,
//  [FINISH_AUTOMATED_SCOUT_FLEET_TASK_TYPE]: 1,
//  [FINISH_SCOUT_FLEET_TASK_TYPE]: 1,
//  [FINISH_CONQUER_FLEET_TASK_TYPE]: 1, // ships arrive to the target planet
//  [FINISH_RESOLVE_CONQUER_FLEET_TASK_TYPE]: 1, // resolve the conquest after 24 hours
//  [FINISH_PIRATE_FLEET_TASK_TYPE]: 1,
//  [FINISH_ATTACK_FLEET_TASK_TYPE]: 1,
//  [FINISH_COUNTERATTACK_FLEET_TASK_TYPE]: 1, // 1 min duration
//  [FINISH_EXPEDITION_FLEET_TASK_TYPE]: 1,
//  [BATTLES] ===> After this, resolve COLLECT_RESOURCES, RESOLVE_CONQUER OR DELETE FINISH_RESOLVE_CONQUER_FLEET_TASK_TYPE if no units left in the planet
// }

// fleet types priority (start)
// {
// TODO: ONLY A SINGLE START_FLEET_TASK_TYPE
//  [START_COLONIZATION_FLEET_TASK_TYPE]: 1,
//  [START_DEPLOYMENT_FLEET_TASK_TYPE]: 1,
//  [START_TRANSPORT_FLEET_TASK_TYPE]: 1,  // transport resource or troops to a planet
//  [START_COLLECT_RESOURCES_FLEET_TASK_TYPE]: 1,
//  [START_AUTOMATED_SCOUT_FLEET_TASK_TYPE]: 1,
//  [START_SCOUT_FLEET_TASK_TYPE]: 1,
//  [START_CONQUER_FLEET_TASK_TYPE]: 1 // send ships to the target planet
//  [START_PIRATE_ATTACK_FLEET_TASK_TYPE]: 1,
//  [START_ATTACK_FLEET_TASK_TYPE]: 1,
//  [START_COUNTERATTACK_FLEET_TASK_TYPE]: 1,
//  [START_EXPEDITION_FLEET_TASK_TYPE]: 1,
// }

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
    processTasksInParallel: false, // this is important to prevent duplicate players
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
