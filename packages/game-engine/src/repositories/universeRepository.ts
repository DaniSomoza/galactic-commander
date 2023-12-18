import mongoose from 'mongoose'
import UniverseModel from '../models/UniverseModel'

async function findUniverses() {
  return UniverseModel.find({}).exec()
}

async function findUniverseByName(name: string) {
  return UniverseModel.findOne({ name }).lean().exec()
}

async function findUniverseById(universeId: mongoose.Types.ObjectId) {
  return UniverseModel.findById(universeId).lean().exec()
}

const universeRepository = {
  findUniverses,
  findUniverseById,
  findUniverseByName
}

export default universeRepository
