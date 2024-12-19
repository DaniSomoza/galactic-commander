import UniverseModel from '../models/UniverseModel'

async function findUniverses() {
  return UniverseModel.find({}).exec()
}

async function findUniverseByName(name: string) {
  return UniverseModel.findOne({ name }).exec()
}

async function findUniverseById(universeId: string) {
  return UniverseModel.findOne({ _id: universeId }).exec()
}

const universeRepository = {
  findUniverses,
  findUniverseById,
  findUniverseByName
}

export default universeRepository
