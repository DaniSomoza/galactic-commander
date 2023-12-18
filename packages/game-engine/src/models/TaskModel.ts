import mongoose, { Schema, Document } from 'mongoose'

export const PENDING_TASK_STATUS = 'PENDING'
export const PROCESSED_TASK_STATUS = 'PROCESSED'
export const ERROR_TASK_STATUS = 'ERROR'
export const CANCELLED_TASK_STATUS = 'CANCELLED'

export type TaskStatus =
  | typeof PENDING_TASK_STATUS
  | typeof PROCESSED_TASK_STATUS
  | typeof ERROR_TASK_STATUS
  | typeof CANCELLED_TASK_STATUS

export const NEW_PLAYER_TASK_TYPE = 'NewPlayerTask'
export type NewPlayerTaskType = typeof NEW_PLAYER_TASK_TYPE
export type NewPlayerTaskData = {
  username: string
  email: string
  race: mongoose.Types.ObjectId
}

export const RESEARCH_TASK_TYPE = 'ResearchTask'
export type ResearchTaskType = typeof RESEARCH_TASK_TYPE
export type ResearchTaskData = {
  // TODO: implement task data
}

const EXPLORE_PLANET_TASK_TYPE = 'ExplorePlanetTask'
export type ExplorePlanetTaskType = typeof EXPLORE_PLANET_TASK_TYPE
export type ExplorePlanetTaskData = {
  // TODO: implement task data
}

export type TaskType = NewPlayerTaskType | ResearchTaskType
export type TaskData<T extends TaskType> = T extends NewPlayerTaskType
  ? NewPlayerTaskData
  : T extends ResearchTaskType
    ? ResearchTaskData
    : T extends ExplorePlanetTaskType
      ? ExplorePlanetTaskData
      : never

type HistoryItem = {
  taskStatus: TaskStatus
  updatedAt: number
}

export interface ITask<Type extends TaskType> {
  type: Type
  data: TaskData<Type>
  status: TaskStatus
  universe: mongoose.Types.ObjectId
  isCancellable: boolean

  executeTaskAt: number | null
  processedAt: number | null
  processingDuration: number | null

  history: HistoryItem[]

  errorDetails: string | null
}

const TaskSchema: Schema = new Schema(
  {
    type: { type: String, required: true },
    universe: {
      type: Schema.Types.ObjectId,
      ref: 'Universe',
      required: true
    },
    status: { type: String, required: true },
    data: { type: Schema.Types.Mixed, required: true },
    isCancellable: { type: Schema.Types.Mixed, required: true },

    executeTaskAt: { type: Number, required: false },
    processedAt: { type: Number, required: false },
    processingDuration: { type: Number, required: false },

    history: [{ type: Schema.Types.Mixed, required: true }],

    errorDetails: { type: String, required: false }
  },
  {
    timestamps: true
  }
)

export type ITaskDocument = ITask<TaskType> & Document

export default function getTaskModel<Type extends TaskType>() {
  return mongoose.model<ITask<Type>>('Task', TaskSchema)
}
