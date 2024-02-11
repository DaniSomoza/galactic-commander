import mongoose, { Schema, Document, Model } from 'mongoose'

// TODO: universeConfig

export interface IUniverse {
  name: string
  isProcessingInProgress: boolean
  lastProcessedTime: number
}

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

export interface IUniverseDocument extends IUniverse, Document {}

const UniverseModel: Model<IUniverseDocument> = mongoose.model<IUniverseDocument>(
  'Universe',
  UniverseSchema
)

export default UniverseModel
