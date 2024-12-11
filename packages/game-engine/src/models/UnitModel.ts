import mongoose, { Types, Schema, Model, Document } from 'mongoose'

import { BonusSchema } from './BonusModel'
import { IUnit } from '../types/IUnit'
import { IResearchDocument } from './ResearchModel'

export const BuildUnitsSchema = new Schema(
  {
    unitId: { type: String, required: true },
    unitName: { type: String, required: true },
    unitType: { type: String, required: true },
    amount: { type: Number, required: true },
    executeTaskAt: { type: Number, required: true },
    taskId: { type: String, required: true },
    energy: { type: Number, required: true },
    resourceCost: { type: Number, required: true }
  },
  { _id: false }
)

export const BuildUnitsQueueSchema = new Schema(
  {
    unitName: { type: String, required: true },
    amount: { type: Number, required: true }
  },
  { _id: false }
)

const UnitSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },

    raceName: { type: String, required: false },

    type: { type: String, required: true },
    subtype: { type: String, required: true },

    resourceCost: { type: Number, required: true },
    energyCost: { type: Number, required: true },
    buildBaseTime: { type: Number, required: true },

    stats: {
      attack: { type: Number, required: true },
      shield: { type: Number, required: true },
      health: { type: Number, required: true },
      speed: { type: Number, required: true },
      cargo: { type: Number, required: true },
      starFighterCapacity: { type: Number, required: true },
      troopsCapacity: { type: Number, required: true }
    },

    // TODO: can travel alone ? hasSpaceEngine?
    isHero: { type: Boolean, required: true, default: false },
    isInvisible: { type: Boolean, required: true, default: false },
    isOrganic: { type: Boolean, required: true, default: false },
    isCapturable: { type: Boolean, required: true, default: true },
    isKamikaze: { type: Boolean, required: true, default: false },
    isAirborne: { type: Boolean, required: true, default: false },
    isSpecial: { type: Boolean, required: true, default: false },
    hasShieldPiercing: { type: Boolean, required: true, default: false },

    requirements: {
      researches: [
        {
          _id: false,
          research: { type: Schema.Types.ObjectId, ref: 'Research', required: true },
          level: { type: Number, required: true }
        }
      ]
    },

    // TODO: implement specials!!
    // specials: []

    bonus: BonusSchema
  },
  {
    timestamps: true
  }
)

export interface IUnitDocument extends IUnit, Document {
  _id: Types.ObjectId

  requirements: {
    researches: {
      research: IResearchDocument
      level: number
    }[]
  }
}

const UnitModel: Model<IUnitDocument> = mongoose.model<IUnitDocument>('Unit', UnitSchema)

export default UnitModel
