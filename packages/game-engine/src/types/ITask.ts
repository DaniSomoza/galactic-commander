import { UnitTypes } from './IUnit'

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
    unitType: UnitTypes
    amount: number
    energy?: number
    duration: number
    resourceCost: number
  }
}

// const EXPLORE_PLANET_TASK_TYPE = 'ExplorePlanetTask'
// export type ExplorePlanetTaskType = typeof EXPLORE_PLANET_TASK_TYPE
// export type ExplorePlanetTaskData = {
//   // TODO: implement task data
// }

export type TaskType =
  | NewPlayerTaskType
  | StartResearchTaskType
  | FinishResearchTaskType
  | StartBuildUnitsTaskType
  | FinishBuildUnitsTaskType

export type TaskData<T extends TaskType> = T extends NewPlayerTaskType
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

type HistoryStatusItem = {
  taskStatus: TaskStatus
  updatedAt: number
}

export interface ITask<Type extends TaskType> {
  type: Type
  data: TaskData<Type>
  universeId: string

  isCancellable: boolean
  status: TaskStatus
  executeTaskAt: number | null
  processedAt: number | null
  processingDuration: number | null
  history: HistoryStatusItem[]
  errorDetails: string | null
}
