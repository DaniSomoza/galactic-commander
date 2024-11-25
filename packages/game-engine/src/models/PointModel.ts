import mongoose, { Model, Schema, Document } from 'mongoose'

import { IPoint } from '../types/IPoint'

const PointSchema = new Schema({
  player: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
  task: { type: Schema.Types.ObjectId, ref: 'Task', required: true },

  points: { type: Number, required: true },

  second: { type: Number, required: true },

  source: { type: Schema.Types.ObjectId, required: true },
  sourceName: { type: String, required: true },
  type: { type: String, required: true }
})

export interface IPointDocument extends IPoint, Document {
  _id: mongoose.Types.ObjectId
}

const PointModel: Model<IPointDocument> = mongoose.model<IPointDocument>('Point', PointSchema)

export default PointModel
