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
    const { username, email, race } = taskData
    return { username, email, race: race.toString() }
  }

  // FinishResearchTaskType
  if ('researchDuration' in taskData) {
    const { player, research, researchDuration, researchResourceCost } = taskData
    return {
      player: player.toString(),
      research: research.toString(),
      researchDuration,
      researchResourceCost
    }
  }

  // StartResearchTaskType
  const { player, research } = taskData

  return { player: player.toString(), research: research.toString() }
}
