import { Types } from 'mongoose'

import {
  ITask,
  PENDING_TASK_STATUS,
  START_RESEARCH_TASK_TYPE,
  StartResearchTaskType
} from '../../../types/ITask'
import getSecond from '../../../helpers/getSecond'

// TODO: add create BASE task
function createStartResearchTask(
  universeId: Types.ObjectId,
  playerId: Types.ObjectId,
  researchId: Types.ObjectId,
  executeTaskAt?: number
): ITask<StartResearchTaskType> {
  const startResearchTask: ITask<StartResearchTaskType> = {
    type: START_RESEARCH_TASK_TYPE,
    universe: universeId,
    data: {
      player: playerId,
      research: researchId
    },

    status: PENDING_TASK_STATUS,
    isCancellable: false,

    executeTaskAt: executeTaskAt ? getSecond(executeTaskAt) : null,
    processedAt: null,
    processingDuration: null,

    history: [
      {
        taskStatus: PENDING_TASK_STATUS,
        updatedAt: new Date().getTime()
      }
    ],

    errorDetails: null
  }

  return startResearchTask
}

export default createStartResearchTask
