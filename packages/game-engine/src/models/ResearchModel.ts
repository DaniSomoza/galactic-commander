import mongoose, { Schema, Types, Model, Document } from 'mongoose'

import { BonusSchema } from './BonusModel'
import { IResearch } from '../types/IResearch'

export const ResearchSchema = new Schema({
  bonus: BonusSchema,
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: { type: String, required: true },

  raceName: { type: String, required: true },

  initialTime: { type: Number, required: true },
  resourceCost: { type: Number, required: true },

  isTroopsPopulationResearch: { type: Boolean, required: true, default: false },
  isFleetEnergyResearch: { type: Boolean, required: true, default: false }
})

export interface IResearchDocument extends IResearch, Document {
  _id: Types.ObjectId
}

const ResearchModel: Model<IResearchDocument> = mongoose.model<IResearchDocument>(
  'Research',
  ResearchSchema
)

export default ResearchModel
