import mongoose, { Schema, Model, Document } from 'mongoose'

import { BonusType, IResearchDocument } from './ResearchModel'
import { IRaceDocument } from './RaceModel'
import { IUniverseDocument } from './UniverseModel'
import { IPlanetDocument } from './PlanetModel'
import { IBonus } from '../types/bonus'

interface IPlayerUser {
  username: string
  email: string
}

interface IPlayerPlanet {
  principal: IPlanetDocument
  colonies: IPlanetDocument[]
  explored: mongoose.Types.ObjectId[]
}

export interface IPlayerBonus {
  bonus: IBonus
  source: mongoose.Types.ObjectId
  type: 'Planet' | 'Special' | 'Unit' | 'Research' | 'Race'
}

// TODO: refactor points to remove them from the player Model (create points collection)
export interface IPlayerPoints {
  points: number
  source: mongoose.Types.ObjectId
  type: 'Unit' | 'Research' | 'Battle'
  second: number
}

interface IPlayerResearch {
  researched: {
    research: IResearchDocument
    level: number
  }[]
  activeResearch?: IPlayerActiveResearch
  queue: string[]
}

interface IPlayerActiveResearch {
  research: IResearchDocument
  level: number
  executeTaskAt: number
  taskId: mongoose.Types.ObjectId
}

interface IPlayerUnits {
  troops: {
    population: number
  }
  fleets: {
    energy: number
  }
  defenses: {
    structures: number
  }
}

export interface IPlayer {
  user: IPlayerUser
  race: IRaceDocument
  universe: IUniverseDocument
  planets: IPlayerPlanet
  bonus: IPlayerBonus[]
  points: IPlayerPoints[]
  researches: IPlayerResearch
  units: IPlayerUnits
}

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

  bonus: [
    {
      _id: false,
      bonus: BonusType,
      source: { type: Schema.Types.ObjectId, required: true },
      type: { type: String, required: true }
    }
  ],

  points: [
    {
      _id: false,
      points: { type: Number, required: true },
      second: { type: Number, required: true },
      source: { type: Schema.Types.ObjectId, required: true },
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

export interface IPlayerDocument extends IPlayer, Document {}

const PlayerModel: Model<IPlayerDocument> = mongoose.model<IPlayerDocument>('Player', PlayerSchema)

export default PlayerModel
