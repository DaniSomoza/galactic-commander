import mongoose, { Schema } from 'mongoose'
import { IRace } from './RaceModel'
import { IPlanet } from './PlanetModel'
import { IUniverse } from './UniverseModel'
import { BonusSchema, IBonus, IResearch } from './ResearchModel'

export type IPlayerResearch = {
  research: IResearch
  level: number
}

export type IPlayerPoint = {
  points: number
  origin: mongoose.Types.ObjectId
  type: 'Unit' | 'Research'
  second: number
}

export type IPlayerBonus = {
  bonus: IBonus
  origin: mongoose.Types.ObjectId
  type: 'Planet' | 'Special' | 'Unit' | 'Research' | 'Race'
}

export interface IPlayer {
  username: string
  email: string

  race: IRace

  universe: IUniverse

  principalPlanet: IPlanet
  planets: IPlanet[]
  planetsExplored: IPlanet[]

  bonus: IPlayerBonus[]

  points: IPlayerPoint[]

  fleetEnergy: number
  troopsPopulation: number

  researches: IPlayerResearch[]
  activeResearch?: IPlayerResearch

  // TODO: implement specials
  // specials: ISpecial[]

  // TODO: implement fleets
  // fleets: IFleet[]
  // isBuildingFleets: boolean

  // TODO: unblocked/Available Units
  // availableUnits: IUnit[],
  // isTrainingTroops: boolean
  // isBuildingDefenses: boolean

  // TODO: Alliance
  // alliance: IAlliance,
}

export const PlayerResearchSchema = new Schema({
  research: {
    type: Schema.Types.ObjectId,
    ref: 'Research',
    required: true
  },
  level: { type: Number, required: true, default: 0 }
})

export const PlayerBonusSchema = new Schema({
  bonus: { type: BonusSchema, required: true },
  origin: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'type'
  },
  type: {
    type: String,
    required: true,
    enum: ['Planet', 'Special', 'Unit', 'Research', 'Race']
  }
})

export const PlayerPointsSchema = new Schema({
  points: { type: Number, required: true },
  origin: {
    type: Schema.Types.ObjectId,
    required: true,
    refPath: 'type'
  },
  type: {
    type: String,
    required: true,
    enum: ['Unit', 'Research']
  }
})

const PlayerSchema: Schema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },

    race: {
      type: Schema.Types.ObjectId,
      ref: 'Race',
      required: true
    },

    universe: {
      type: Schema.Types.ObjectId,
      ref: 'Universe',
      required: true
    },

    principalPlanet: {
      type: Schema.Types.ObjectId,
      ref: 'Planet',
      required: true
    },
    planets: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Planet',
        required: true
      }
    ],
    planetsExplored: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Planet',
        required: true
      }
    ],

    researches: [
      {
        type: PlayerResearchSchema,
        required: true
      }
    ],
    activeResearch: {
      type: PlayerResearchSchema,
      required: false
    },

    // isBuildingFleets: { type: Boolean, required: true, default: false },
    // isTrainingTroops: { type: Boolean, required: true, default: false },
    // isBuildingDefenses: { type: Boolean, required: true, default: false },

    bonus: [{ type: PlayerBonusSchema, required: true }],
    points: [{ type: PlayerPointsSchema, required: true }],

    fleetEnergy: { type: Number, required: true },
    troopsPopulation: { type: Number, required: true }
  },
  {
    timestamps: true
  }
)

export type IPlayerDocument = IPlayer & Document

const PlayerModel = mongoose.model<IPlayer>('Player', PlayerSchema)

export default PlayerModel
