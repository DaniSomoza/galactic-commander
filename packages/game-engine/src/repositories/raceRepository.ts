import mongoose from 'mongoose'

import RaceModel from '../models/RaceModel'
import { IRace } from '../types/IRace'

async function findRaces() {
  return RaceModel.find({})
    .populate('researches')
    .populate({
      path: 'units',
      model: 'Unit',
      populate: {
        path: 'requirements.researches.research',
        model: 'Research'
      }
    })
    .exec()
}

async function findRaceById(raceId: mongoose.Types.ObjectId) {
  return RaceModel.findById(raceId).populate('researches').exec()
}

async function findRaceByName(name: string) {
  return RaceModel.findOne({ name }).exec()
}

async function insertRaces(races: IRace[]) {
  return RaceModel.insertMany(races)
}

const raceRepository = {
  findRaces,
  findRaceById,
  findRaceByName,
  insertRaces
}

export default raceRepository
