import mongoose, { Model, Schema, Document } from 'mongoose'

import { IPoint } from '../types/IPoint'

const PointSchema = new Schema({
  playerId: { type: String, required: true },
  taskId: { type: String, required: true },

  points: { type: Number, required: true },

  sourceId: { type: String, required: true },
  sourceName: { type: String, required: true },

  type: { type: String, required: true },

  second: { type: Number, required: true }
})

export interface IPointDocument extends IPoint, Document {
  _id: mongoose.Types.ObjectId
}

const PointModel: Model<IPointDocument> = mongoose.model<IPointDocument>('Point', PointSchema)

export default PointModel
