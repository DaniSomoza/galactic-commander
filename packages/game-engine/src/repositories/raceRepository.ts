import mongoose from 'mongoose'

import RaceModel from '../models/RaceModel'

async function findRaces() {
  return RaceModel.find({}).exec()
}

async function findRaceById(raceId: mongoose.Types.ObjectId) {
  return RaceModel.findById(raceId).populate('researches').exec()
}

async function findRaceByName(name: string) {
  return RaceModel.findOne({ name }).exec()
}

const raceRepository = {
  findRaces,
  findRaceById,
  findRaceByName
}

export default raceRepository
