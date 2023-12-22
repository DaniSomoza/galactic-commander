import mongoose from 'mongoose'
import RaceModel from '../models/RaceModel'

async function findRaceById(raceId: mongoose.Types.ObjectId) {
  return RaceModel.findById(raceId).exec()
}

async function findRaceByName(name: string) {
  return RaceModel.findOne({ name }).lean().exec()
}

const raceRepository = {
  findRaceById,
  findRaceByName
}

export default raceRepository
