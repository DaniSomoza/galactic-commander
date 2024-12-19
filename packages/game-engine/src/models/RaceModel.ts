import mongoose, { Schema, Model, Document } from 'mongoose'

import { BonusSchema } from './BonusModel'
import {
  DEFAULT_ALLOWED_PLANETS,
  DEFAULT_FLEET_ENERGY,
  DEFAULT_INITIAL_RESOURCES,
  DEFAULT_INTERGALACTIC_TRAVEL_THRESHOLD,
  DEFAULT_RESOURCE_NAME,
  DEFAULT_TROOPS_POPULATION,
  IRace
} from '../types/IRace'
import { IResearchDocument } from './ResearchModel'
import { IUnitDocument } from './UnitModel'

const RaceSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    tags: [{ type: String, required: true }],
    maxPlanetsAllowed: { type: Number, required: true, default: DEFAULT_ALLOWED_PLANETS },
    baseFleetEnergy: { type: Number, required: true, default: DEFAULT_FLEET_ENERGY },
    baseTroopsPopulation: { type: Number, required: true, default: DEFAULT_TROOPS_POPULATION },
    baseResources: { type: Number, required: true, default: DEFAULT_INITIAL_RESOURCES },
    resourceName: { type: String, required: true, default: DEFAULT_RESOURCE_NAME },
    intergalacticTravelThreshold: {
      type: Number,
      required: true,
      default: DEFAULT_INTERGALACTIC_TRAVEL_THRESHOLD
    },

    researches: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Research',
        required: true
      }
    ],

    units: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Unit',
        required: true
      }
    ],
    specials: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Special',
        required: true
      }
    ],

    bonus: BonusSchema
  },
  {
    timestamps: true
  }
)

export interface IRaceDocument extends IRace, Document {
  _id: mongoose.Types.ObjectId

  researches: IResearchDocument[]
  units: IUnitDocument[]

  // TODO: add specials ?
}

const RaceModel: Model<IRaceDocument> = mongoose.model<IRaceDocument>('Race', RaceSchema)

export default RaceModel
