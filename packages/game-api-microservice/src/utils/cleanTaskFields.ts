import { ITaskDocument } from 'game-engine/models/TaskModel'

import { TaskType, TaskTypesTypes } from '../types/Task'

function cleanTaskFields(task: ITaskDocument): TaskType<TaskTypesTypes> {
  const {
    _id,
    type,
    data,
    universeId,
    isCancellable,
    status,
    executeTaskAt,
    processedAt,
    processingDuration,
    history,
    errorDetails
  } = task

  return {
    taskId: _id.toString(),
    type,
    data: cleanTaskDataFields(data),
    universeId,
    isCancellable,
    status,
    executeTaskAt,
    processedAt,
    processingDuration,
    history,
    errorDetails
  }
}

export default cleanTaskFields

function cleanTaskDataFields(taskData: ITaskDocument['data']): TaskType<TaskTypesTypes>['data'] {
  // NewPlayerTaskType
  if ('username' in taskData) {
    const { username, email, raceId } = taskData
    return { username, email, raceId }
  }

  // FinishResearchTaskType
  if ('researchDuration' in taskData) {
    const { playerId, researchId, researchDuration, researchResourceCost } = taskData
    return {
      playerId,
      researchId,
      researchDuration,
      researchResourceCost
    }
  }

  // StartResearchTaskType
  if ('researchId' in taskData) {
    const { playerId, researchId } = taskData

    return { playerId, researchId }
  }

  // StartBuildUnitsTaskType or FinishBuildUnitsTaskType
  const { playerId, planetId, build } = taskData

  return {
    build,
    playerId,
    planetId
  }
}
