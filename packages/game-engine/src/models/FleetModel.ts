import mongoose, { Schema, Model, Types, Document } from 'mongoose'

import { IFleet } from '../types/IFleet'
import { IPlanetDocument } from './PlanetModel'
import { IUnitDocument } from './UnitModel'
import { IPlayerDocument } from './PlayerModel'

const FleetUnitsSchema = new Schema(
  {
    unit: { type: Schema.Types.ObjectId, ref: 'Unit' },
    amount: { type: Number }
  },
  { _id: false }
)

export const FleetSchema = new Schema({
  player: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
  units: [FleetUnitsSchema],

  isReturning: { type: Boolean, required: true, default: false },
  isFinished: { type: Boolean, required: true, default: false },

  fromPlanet: { type: Schema.Types.ObjectId, ref: 'Planet', required: true },
  toPlanet: { type: Schema.Types.ObjectId, ref: 'Planet', required: true },

  arriveAt: { type: Number, required: true },
  startedAt: { type: Number, required: true },
  duration: { type: Number, required: true },

  fleetType: { type: String, required: true },
  resources: { type: Number, required: true, default: 0 },
  taskId: { type: String, required: false }
})

export interface IFleetDocument extends IFleet, Document {
  _id: Types.ObjectId

  player: IPlayerDocument

  units: {
    amount: number
    unit: IUnitDocument
  }[]

  fromPlanet: IPlanetDocument
  toPlanet: IPlanetDocument
}

const FleetModel: Model<IFleetDocument> = mongoose.model<IFleetDocument>('Fleet', FleetSchema)

export default FleetModel
