import mongoose, { Schema, Model, Document } from 'mongoose'

import { BonusSchema } from './BonusModel'
import { IPlayer } from '../types/IPlayer'
import { IRaceDocument } from './RaceModel'
import { IResearchDocument } from './ResearchModel'
import { IPlanetDocument } from './PlanetModel'
import { FleetSchema, IFleetDocument } from './FleetModel'

const ActiveResearchSchema = new Schema(
  {
    research: { type: Schema.Types.ObjectId, ref: 'Research', required: true },
    level: { type: Number, required: true },
    executeTaskAt: { type: Number, required: true },
    taskId: { type: String, required: true }
  },
  { _id: false }
)

const PlayerSchema: Schema = new Schema({
  user: {
    username: { type: String, required: true },
    email: { type: String, required: true }
  },

  race: { type: Schema.Types.ObjectId, ref: 'Race', required: true },

  universeId: { type: String, required: true },

  planets: {
    principal: { type: Schema.Types.ObjectId, ref: 'Planet', required: true },
    colonies: [{ type: Schema.Types.ObjectId, ref: 'Planet' }]
  },

  perks: [
    {
      _id: false,
      bonus: BonusSchema,
      sourceId: { type: String, required: true },
      sourceName: { type: String, required: true },
      type: { type: String, required: true }
    }
  ],

  researches: {
    researched: [
      {
        _id: false,
        research: { type: Schema.Types.ObjectId, ref: 'Research', required: true },
        level: { type: Number, required: true }
      }
    ],
    activeResearch: {
      type: ActiveResearchSchema,
      required: false,
      default: undefined
    },
    queue: [{ type: String }]
  },

  fleets: [FleetSchema]
})

interface IPlayerResearchDocument {
  research: IResearchDocument
  level: number
}

interface IPlayerActiveResearchDocument {
  research: IResearchDocument
  level: number
  executeTaskAt: number
  taskId: string
}

export interface IPlayerDocument extends IPlayer, Document {
  _id: mongoose.Types.ObjectId

  race: IRaceDocument

  researches: {
    researched: IPlayerResearchDocument[]
    activeResearch?: IPlayerActiveResearchDocument
    queue: string[]
  }
  planets: {
    principal: IPlanetDocument
    colonies: IPlanetDocument[]
  }

  fleets: IFleetDocument[]
}

const PlayerModel: Model<IPlayerDocument> = mongoose.model<IPlayerDocument>('Player', PlayerSchema)

export default PlayerModel
