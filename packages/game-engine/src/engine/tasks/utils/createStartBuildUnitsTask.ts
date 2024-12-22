import {
  ITask,
  PENDING_TASK_STATUS,
  START_BUILD_UNITS_TASK_TYPE,
  StartBuildUnitsTaskType
} from '../../../types/ITask'
import getSecond from '../../../helpers/getSecond'

// TODO: add create BASE task
function createStartBuildUnitsTask(
  universeId: string,
  playerId: string,
  planetId: string,
  unitId: string,
  amount: number,
  executeTaskAt?: number
): ITask<StartBuildUnitsTaskType> {
  const startResearchTask: ITask<StartBuildUnitsTaskType> = {
    type: START_BUILD_UNITS_TASK_TYPE,

    universeId,

    data: {
      playerId,
      planetId,
      build: {
        unitId,
        amount
      }
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

export default createStartBuildUnitsTask
