import { UnitTypes } from './Unit'

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
  raceId: string
}

export const START_RESEARCH_TASK_TYPE = 'START_RESEARCH_TASK'
export type StartResearchTaskType = typeof START_RESEARCH_TASK_TYPE
export type StartResearchTaskData = {
  playerId: string
  researchId: string
}

export const FINISH_RESEARCH_TASK_TYPE = 'FINISH_RESEARCH_TASK'
export type FinishResearchTaskType = typeof FINISH_RESEARCH_TASK_TYPE
export type FinishResearchTaskData = {
  playerId: string
  researchId: string
  researchDuration: number
  researchResourceCost: number
}

export const START_BUILD_UNITS_TASK_TYPE = 'START_BUILD_UNITS_TASK_TYPE'
export type StartBuildUnitsTaskType = typeof START_BUILD_UNITS_TASK_TYPE
export type StartBuildUnitsTaskData = {
  playerId: string
  planetId: string
  build: {
    unitId: string
    amount: number
  }
}

export const FINISH_BUILD_UNITS_TASK_TYPE = 'FINISH_BUILD_UNITS_TASK'
export type FinishBuildUnitsTaskType = typeof FINISH_BUILD_UNITS_TASK_TYPE
export type FinishBuildUnitsTaskData = {
  playerId: string
  planetId: string
  build: {
    unitId: string
    amount: number
  }
  buildUnitType: UnitTypes
  buildUnitsDuration: number
  buildUnitsResourceCost: number
}

export type TaskTypesTypes =
  | NewPlayerTaskType
  | StartResearchTaskType
  | FinishResearchTaskType
  | StartBuildUnitsTaskType
  | FinishBuildUnitsTaskType

export type TaskData<T extends TaskTypesTypes> = T extends NewPlayerTaskType
  ? NewPlayerTaskData
  : T extends StartResearchTaskType
    ? StartResearchTaskData
    : T extends FinishResearchTaskType
      ? FinishResearchTaskData
      : T extends StartBuildUnitsTaskType
        ? StartBuildUnitsTaskData
        : T extends FinishBuildUnitsTaskType
          ? FinishBuildUnitsTaskData
          : never

export type HistoryStatusItemType = {
  taskStatus: TaskStatus
  updatedAt: number
}

export type HistoryTaskType = HistoryStatusItemType[]

export type TaskType<T extends TaskTypesTypes> = {
  taskId: string
  type: TaskTypesTypes
  data: TaskData<T>
  universe: string

  isCancellable: boolean
  status: TaskStatus
  executeTaskAt: number | null
  processedAt: number | null
  processingDuration: number | null
  history: HistoryTaskType
  errorDetails: string | null
}

export type getTaskResponseType = { task: TaskType<TaskTypesTypes> }
