import mongoose, { Schema, Document } from 'mongoose'

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

export type IUniverseDocument = IUniverse & Document

const UniverseModel = mongoose.model<IUniverse>('Universe', UniverseSchema)

export default UniverseModel
