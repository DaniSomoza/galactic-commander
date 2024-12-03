import { ITaskDocument } from 'game-engine/models/TaskModel'

import { TaskType, TaskTypesTypes } from '../types/Task'

function cleanTaskFields(task: ITaskDocument): TaskType<TaskTypesTypes> {
  const {
    _id,
    type,
    data,
    universe,

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
    universe: universe.toString(),

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
    return { username, email, raceId: raceId.toString() }
  }

  // FinishResearchTaskType
  if ('researchDuration' in taskData) {
    const { playerId, researchId, researchDuration, researchResourceCost } = taskData
    return {
      playerId: playerId.toString(),
      researchId: researchId.toString(),
      researchDuration,
      researchResourceCost
    }
  }

  // StartResearchTaskType
  if ('researchId' in taskData) {
    const { playerId, researchId } = taskData

    return { playerId: playerId.toString(), researchId: researchId.toString() }
  }

  // StartBuildUnitsTaskType or FinishBuildUnitsTaskType
  const { playerId, planetId, build } = taskData

  return {
    playerId: playerId.toString(),
    planetId: planetId.toString(),
    build: {
      ...build,
      unitId: build.unitId.toString()
    }
  }
}
