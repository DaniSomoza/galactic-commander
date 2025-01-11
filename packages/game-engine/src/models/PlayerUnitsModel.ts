import mongoose, { Schema, Model, Types, Document } from 'mongoose'
import { IPlayerUnits } from '../types/IPlayerUnits'
import { IPlanetDocument } from './PlanetModel'
import { IUnitDocument } from './UnitModel'
import { IPlayerDocument } from './PlayerModel'

const PlanetUnitsSchema = new Schema(
  {
    unit: { type: Schema.Types.ObjectId, ref: 'Unit' },
    amount: { type: Number }
  },
  { _id: false }
)

const PlayerUnitsSchema = new Schema({
  player: { type: Schema.Types.ObjectId, ref: 'Player', required: true },
  units: [PlanetUnitsSchema],
  planet: { type: Schema.Types.ObjectId, ref: 'Planet', required: true }
})

export interface IPlayerUnitsDocument extends IPlayerUnits, Document {
  _id: Types.ObjectId

  player: IPlayerDocument

  units: {
    amount: number
    unit: IUnitDocument
  }[]

  planet: IPlanetDocument
}

const PlayerUnitsModel: Model<IPlayerUnitsDocument> = mongoose.model<IPlayerUnitsDocument>(
  'PlayerUnits',
  PlayerUnitsSchema
)

export default PlayerUnitsModel
