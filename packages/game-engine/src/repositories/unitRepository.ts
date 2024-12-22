import mongoose from 'mongoose'

import UnitModel from '../models/UnitModel'
import { IUnit } from '../types/IUnit'

async function findUnits() {
  return UnitModel.find({}).exec()
}

async function findUnitById(unitId: mongoose.Types.ObjectId) {
  return UnitModel.findById(unitId).exec()
}

async function insertUnits(units: IUnit[]) {
  return UnitModel.insertMany(units)
}

const unitRepository = {
  findUnits,
  insertUnits,
  findUnitById
}

export default unitRepository
