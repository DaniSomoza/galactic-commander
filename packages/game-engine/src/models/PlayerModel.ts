import mongoose, { Schema } from 'mongoose'
import { BonusSchema, IBonus, IRace } from './RaceModel'
import { IPlanet } from './PlanetModel'

export interface IPlayer {
  username: string
  email: string

  race: IRace

  principalPlanet: IPlanet
  planets: IPlanet[]
  planetsExplored: IPlanet[]

  // TODO: implement bonus
  bonus: IBonus[]

  fleetEnergy: number
  troopsPopulation: number
  resourceProduction: number

  // TODO: implement researches
  // researches: IResearch[]
  // isResearching: boolean

  // TODO: implement points
  // points: IPoint[]

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

const PlayerSchema: Schema = new Schema(
  {
    // TODO: add universeId ???? here
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },

    race: {
      type: Schema.Types.ObjectId,
      ref: 'Race',
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

    // isResearching: { type: Boolean, required: true, default: false },
    // isBuildingFleets: { type: Boolean, required: true, default: false },
    // isTrainingTroops: { type: Boolean, required: true, default: false },
    // isBuildingDefenses: { type: Boolean, required: true, default: false },

    bonus: [{ type: BonusSchema, required: true }],

    fleetEnergy: { type: Number, required: true },
    troopsPopulation: { type: Number, required: true },
    resourceProduction: { type: Number, required: true }
  },
  {
    timestamps: true
  }
)

const PlayerModel = mongoose.model<IPlayer>('Player', PlayerSchema)

export default PlayerModel
