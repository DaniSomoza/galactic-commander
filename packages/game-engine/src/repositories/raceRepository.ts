import mongoose from 'mongoose'
import RaceModel from '../models/RaceModel'

async function findRaceById(raceId: mongoose.Types.ObjectId) {
  return RaceModel.findById(raceId).populate('researches').exec()
}

async function findRaceByName(name: string) {
  return RaceModel.findOne({ name }).exec()
}

const raceRepository = {
  findRaceById,
  findRaceByName
}

export default raceRepository
