import mongoose, { Schema, Model, Document } from 'mongoose'

import { IPlanet } from '../types/IPlanet'
import { IUniverseDocument } from './UniverseModel'
import { BuildUnitsSchema, IUnitDocument } from './UnitModel'

const PlanetSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    imgUrl: { type: String, required: true },

    universe: { type: Schema.Types.ObjectId, ref: 'Universe', required: true },

    owner: {
      type: Schema.Types.ObjectId,
      ref: 'Player',
      required: false,
      default: null
    },
    colonizedAt: { type: Number },

    resources: { type: Number, required: true },
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

    unitBuild: {
      troops: {
        activeBuild: {
          type: BuildUnitsSchema,
          required: false,
          default: undefined
        },
        queue: [{ type: BuildUnitsSchema }]
      },
      spaceships: {
        activeBuild: {
          type: BuildUnitsSchema,
          required: false,
          default: undefined
        },
        queue: [{ type: BuildUnitsSchema }]
      },
      defenses: {
        activeBuild: {
          type: BuildUnitsSchema,
          required: false,
          default: undefined
        },
        queue: [{ type: BuildUnitsSchema }]
      }
    },

    units: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Unit',
        required: true
      }
    ]
  },
  {
    timestamps: true
  }
)

export interface IPlanetDocument extends IPlanet, Document {
  _id: mongoose.Types.ObjectId

  universe: IUniverseDocument
  units: IUnitDocument[]
}

const PlanetModel: Model<IPlanetDocument> = mongoose.model<IPlanetDocument>('Planet', PlanetSchema)

export default PlanetModel
