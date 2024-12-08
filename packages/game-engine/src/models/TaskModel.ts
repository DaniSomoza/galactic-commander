import mongoose, { Schema, Model, Types, Document } from 'mongoose'

import { ITask, TaskType } from '../types/ITask'

const TaskSchema: Schema = new Schema(
  {
    type: { type: String, required: true },
    universeId: { type: String, required: true },
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

export interface ITaskDocument extends ITask<TaskType>, Document {
  _id: Types.ObjectId
}
export interface ITaskTypeDocument<Type extends TaskType> extends ITask<Type>, Document {
  _id: Types.ObjectId
}

export default function getTaskModel<Type extends TaskType>() {
  const TaskModel: Model<ITask<Type>> = mongoose.model<ITask<Type>>('Task', TaskSchema)
  return TaskModel
}
