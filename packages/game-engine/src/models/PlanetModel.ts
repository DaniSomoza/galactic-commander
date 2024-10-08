import mongoose, { Schema, Document, Model } from 'mongoose'
import { IPlayerDocument } from './PlayerModel'

export const DEFAULT_PLANET_RESOURCES = 10_000

export const GALAXIES = 3
export const SECTORS_PER_GALAXIES = 6
export const SYSTEM_PER_SECTORS = 15
export const PLANETS_PER_SYSTEM = 12

// TODO: implement moons

export type PlanetCoordinates = {
  galaxy: number
  sector: number
  system: number
  planet: number
}

export interface IPlanet {
  name: string
  owner: IPlayerDocument | null
  colonizedAt: number

  resources: number
  resourceQuality: number
  lastResourceProductionTime: number

  universe: mongoose.Types.ObjectId

  coordinates: PlanetCoordinates

  isSpecial: boolean
  isPrincipal: boolean
  isUnderConquer: boolean
  isExplored: boolean

  specials: mongoose.Types.ObjectId[]

  isBuildingFleets: boolean
  isTrainingTroops: boolean
  isBuildingDefenses: boolean

  // TODO: units in the planet
  // TODO: fleets traveling to the planet
  // TODO: fleets traveling from the planet
  // TODO: fleets landed in the planet
  // TODO: troops landed in the planet
  // TODO: defenses landed in the planet
}

const PlanetSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'Player',
      required: false,
      default: null
    },

    universe: { type: Schema.Types.ObjectId, ref: 'Universe', required: true },

    colonizedAt: { type: Number },

    resources: { type: Number, required: true, default: DEFAULT_PLANET_RESOURCES },
    resourceQuality: { type: Number, required: true },
    lastResourceProductionTime: { type: Number, required: true },

    coordinates: {
      galaxy: { type: Number, required: true },
      sector: { type: Number, required: true },
      system: { type: Number, required: true },
      planet: { type: Number, required: true }
    },

    isSpecial: { type: Boolean, required: true, default: false },
    isPrincipal: { type: Boolean, required: true, default: false },
    isUnderConquer: { type: Boolean, required: true, default: false },
    isExplored: { type: Boolean, required: true, default: false },

    specials: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Special',
        required: false
      }
    ],

    isBuildingFleets: { type: Boolean, required: true, default: false },
    isTrainingTroops: { type: Boolean, required: true, default: false },
    isBuildingDefenses: { type: Boolean, required: true, default: false }
  },
  {
    timestamps: true
  }
)

export interface IPlanetDocument extends IPlanet, Document {}

const PlanetModel: Model<IPlanetDocument> = mongoose.model<IPlanetDocument>('Planet', PlanetSchema)

export default PlanetModel
