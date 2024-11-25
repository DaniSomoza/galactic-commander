import mongoose, { Schema, Model } from 'mongoose'

import { BonusSchema } from './BonusModel'
import { IPlayer } from '../types/IPlayer'
import { IRaceDocument } from './RaceModel'
import { IUniverseDocument } from './UniverseModel'
import { IResearchDocument } from './ResearchModel'
import { IPlanetDocument } from './PlanetModel'

const ActiveResearchSchema = new Schema(
  {
    research: { type: Schema.Types.ObjectId, ref: 'Research' },
    level: { type: Number },
    executeTaskAt: { type: Number },
    taskId: { type: Schema.Types.ObjectId, ref: 'Task' }
  },
  { _id: false }
)

const PlayerSchema: Schema = new Schema({
  user: {
    username: { type: String, required: true },
    email: { type: String, required: true }
  },

  race: { type: Schema.Types.ObjectId, ref: 'Race', required: true },

  universe: { type: Schema.Types.ObjectId, ref: 'Universe', required: true },

  planets: {
    principal: { type: Schema.Types.ObjectId, ref: 'Planet', required: true },
    colonies: [{ type: Schema.Types.ObjectId, ref: 'Planet' }],
    explored: [{ type: Schema.Types.ObjectId, ref: 'Planet' }]
  },

  perks: [
    {
      _id: false,
      bonus: BonusSchema,
      source: { type: Schema.Types.ObjectId, required: true },
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

  units: {
    troops: {
      population: { type: Number, required: true }
    },
    fleets: {
      energy: { type: Number, required: true }
    },
    defenses: {
      structures: { type: Number, required: true }
    }
  }
})

interface IPlayerResearchDocument {
  research: IResearchDocument
  level: number
}

interface IPlayerActiveResearchDocument {
  research: IResearchDocument
  level: number
  executeTaskAt: number
  taskId: mongoose.Types.ObjectId
}

export interface IPlayerDocument extends IPlayer, Document {
  _id: mongoose.Types.ObjectId
  race: IRaceDocument
  universe: IUniverseDocument
  researches: {
    researched: IPlayerResearchDocument[]
    activeResearch?: IPlayerActiveResearchDocument
    queue: string[]
  }
  planets: {
    principal: IPlanetDocument
    colonies: IPlanetDocument[]
  }
}

const PlayerModel: Model<IPlayerDocument> = mongoose.model<IPlayerDocument>('Player', PlayerSchema)

export default PlayerModel
