import mongoose, { Schema, Model, Document } from 'mongoose'

import { IUniverse } from '../types/IUniverse'

const UniverseSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    isProcessingInProgress: { type: Boolean, required: true, default: false },
    lastProcessedTime: { type: Number, required: true }
  },
  {
    timestamps: true
  }
)

export interface IUniverseDocument extends IUniverse, Document {
  _id: mongoose.Types.ObjectId
}

const UniverseModel: Model<IUniverseDocument> = mongoose.model<IUniverseDocument>(
  'Universe',
  UniverseSchema
)

export default UniverseModel
