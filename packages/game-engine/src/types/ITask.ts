import mongoose from 'mongoose'

export const PENDING_TASK_STATUS = 'PENDING'
export const PROCESSED_TASK_STATUS = 'PROCESSED'
export const ERROR_TASK_STATUS = 'ERROR'
export const CANCELLED_TASK_STATUS = 'CANCELLED'

export type TaskStatus =
  | typeof PENDING_TASK_STATUS
  | typeof PROCESSED_TASK_STATUS
  | typeof ERROR_TASK_STATUS
  | typeof CANCELLED_TASK_STATUS

export const NEW_PLAYER_TASK_TYPE = 'NEW_PLAYER_TASK'
export type NewPlayerTaskType = typeof NEW_PLAYER_TASK_TYPE
export type NewPlayerTaskData = {
  username: string
  email: string
  race: mongoose.Types.ObjectId
}

export const START_RESEARCH_TASK_TYPE = 'START_RESEARCH_TASK'
export type StartResearchTaskType = typeof START_RESEARCH_TASK_TYPE
export type StartResearchTaskData = {
  player: mongoose.Types.ObjectId
  research: mongoose.Types.ObjectId
}

export const FINISH_RESEARCH_TASK_TYPE = 'FINISH_RESEARCH_TASK'
export type FinishResearchTaskType = typeof FINISH_RESEARCH_TASK_TYPE
export type FinishResearchTaskData = {
  player: mongoose.Types.ObjectId
  research: mongoose.Types.ObjectId
  researchDuration: number
  researchResourceCost: number
}

// const EXPLORE_PLANET_TASK_TYPE = 'ExplorePlanetTask'
// export type ExplorePlanetTaskType = typeof EXPLORE_PLANET_TASK_TYPE
// export type ExplorePlanetTaskData = {
//   // TODO: implement task data
// }

export type TaskType = NewPlayerTaskType | StartResearchTaskType | FinishResearchTaskType
export type TaskData<T extends TaskType> = T extends NewPlayerTaskType
  ? NewPlayerTaskData
  : T extends StartResearchTaskType
    ? StartResearchTaskData
    : T extends FinishResearchTaskType
      ? FinishResearchTaskData
      : never

type HistoryStatusItem = {
  taskStatus: TaskStatus
  updatedAt: number
}

export interface ITask<Type extends TaskType> {
  type: Type
  data: TaskData<Type>
  universe: mongoose.Types.ObjectId

  isCancellable: boolean
  status: TaskStatus
  executeTaskAt: number | null
  processedAt: number | null
  processingDuration: number | null
  history: HistoryStatusItem[]
  errorDetails: string | null
}
