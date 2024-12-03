import mongoose, { Schema, Model, Types, Document } from 'mongoose'

import { IFleet } from '../types/IFleet'
import { IPlanetDocument } from './PlanetModel'
import { IUnitDocument } from './UnitModel'

const FleetUnitsSchema = new Schema(
  {
    unit: { type: Schema.Types.ObjectId, ref: 'Unit' },
    amount: { type: Number }
  },
  { _id: false }
)

const FleetTravelSchema = new Schema(
  {
    destination: { type: Schema.Types.ObjectId, ref: 'Planet', required: true },
    arriveAt: { type: Number, required: true },
    fleetType: { type: Number, required: true }, // TODO: create a fleetType
    isReturning: { type: Boolean, required: true, default: false },
    resources: { type: Number, required: true, default: 0 }
  },
  { _id: false }
)

export const FleetSchema = new Schema({
  planet: { type: Schema.Types.ObjectId, ref: 'Planet', required: true },

  playerId: { type: Schema.Types.ObjectId, ref: 'Player', required: true },

  travel: { type: FleetTravelSchema, required: false, default: undefined },

  units: [FleetUnitsSchema]
})

export interface IFleetDocument extends IFleet, Document {
  _id: Types.ObjectId

  planet: IPlanetDocument

  playerId: Types.ObjectId

  travel?: {
    destination: IPlanetDocument
    arriveAt: number
    fleetType: string // TODO: create a fleetType
    isReturning: boolean
    resources: number
  }

  units: {
    amount: number
    unit: IUnitDocument
  }[]
}

const FleetModel: Model<IFleetDocument> = mongoose.model<IFleetDocument>('Fleet', FleetSchema)

export default FleetModel
