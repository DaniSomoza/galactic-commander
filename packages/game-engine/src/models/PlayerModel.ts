import mongoose, { Schema, Model, Document } from 'mongoose'
import { BonusType, IBonus, IResearchDocument } from './ResearchModel'
import { IRaceDocument } from './RaceModel'
import { IUniverseDocument } from './UniverseModel'
import { IPlanetDocument } from './PlanetModel'

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
  // // TODO: rename origin to source
  // source: {
  //   id: mongoose.Types.ObjectId
  //   model: 'Unit' | 'Research'
  // }
  origin: mongoose.Types.ObjectId
  type: 'Planet' | 'Special' | 'Unit' | 'Research' | 'Race'
}

export interface IPlayerPoints {
  points: number
  // // TODO: rename origin to source
  // source: {
  //   id: mongoose.Types.ObjectId
  //   model: 'Unit' | 'Research'
  // }
  origin: mongoose.Types.ObjectId
  type: 'Unit' | 'Research' | 'Battle'
  second: number
}

interface IPlayerResearch {
  research: IResearchDocument
  level: number
}

interface IPlayerUnits {
  troops: {
    population: number
  }
  fleets: {
    energy: number
  }
  defenses: {
    // TODO: implement defenses
  }
}

export interface IPlayer {
  user: IPlayerUser
  race: IRaceDocument
  universe: IUniverseDocument
  planets: IPlayerPlanet
  // TODO: rename this to perks
  bonus: IPlayerBonus[]
  points: IPlayerPoints[]
  researches: IPlayerResearch[]
  // TODO: activeResearch within researches ???
  activeResearch?: IPlayerResearch
  units: IPlayerUnits
}

const ActiveResearchSchema = new Schema(
  {
    research: { type: Schema.Types.ObjectId, ref: 'Research' },
    level: { type: Number }
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
      origin: { type: Schema.Types.ObjectId, required: true },
      type: { type: String, required: true }
    }
  ],

  points: [
    {
      _id: false,
      points: { type: Number, required: true },
      second: { type: Number, required: true },
      origin: { type: Schema.Types.ObjectId, required: true },
      type: { type: String, required: true }
    }
  ],

  researches: [
    {
      _id: false,
      research: { type: Schema.Types.ObjectId, ref: 'Research', required: true },
      level: { type: Number, required: true }
    }
  ],

  activeResearch: {
    type: ActiveResearchSchema,
    required: false,
    default: undefined // Explicitamente establecer como undefined si no se proporciona
  },

  // activeResearch: {
  //   // required: false,
  //   // TODO: create a schema!!!
  //   research: { type: Schema.Types.ObjectId, ref: 'Research' },
  //   level: { type: Number }
  // },

  // TODO: change researches
  // researches: {
  //   researched: [
  //     {
  //       research: { type: Schema.Types.ObjectId, ref: 'Research' },
  //       level: { type: Number, required: true }
  //     }
  //   ],
  //   // or current
  //   active: {
  //     required: false,
  //     research: { type: Schema.Types.ObjectId, ref: 'Research' },
  //     level: { type: Number, required: true }
  //   }
  // },

  units: {
    troops: {
      population: { type: Number, required: true }
    },
    fleets: {
      energy: { type: Number, required: true }
    },
    defenses: {}
  }
})

export interface IPlayerDocument extends IPlayer, Document {}

const PlayerModel: Model<IPlayerDocument> = mongoose.model<IPlayerDocument>('Player', PlayerSchema)

export default PlayerModel
