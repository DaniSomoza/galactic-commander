import mongoose, { Schema, Document } from 'mongoose'

export const DEFAULT_PLANET_RESOURCES = 1000

export const GALAXIES = 3
export const SECTORS_PER_GALAXIES = 6
export const SYSTEM_PER_SECTORS = 15
export const PLANETS_PER_SYSTEM = 12

export interface IPlanet {
  name: string
  owner: mongoose.Types.ObjectId | null
  colonizedAt: number

  resources: number
  resourceQuality: number
  lastResourceProductionTime: number

  coordinates: {
    galaxy: number
    sector: number
    system: number
    planet: number
    // TODO: implement moons position=0 planet, position=[1,N] moons
    label: string // galaxy:sector:system:planet:position
  }

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
    colonizedAt: { type: Number },

    resources: { type: Number, required: true, default: DEFAULT_PLANET_RESOURCES },
    resourceQuality: { type: Number, required: true },
    lastResourceProductionTime: { type: Number, required: true },

    coordinates: {
      galaxy: { type: Number, required: true },
      sector: { type: Number, required: true },
      system: { type: Number, required: true },
      planet: { type: Number, required: true },
      label: { type: String, required: true }
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

export type IPlanetDocument = IPlanet & Document

const PlanetModel = mongoose.model<IPlanet>('Planet', PlanetSchema)

export default PlanetModel
