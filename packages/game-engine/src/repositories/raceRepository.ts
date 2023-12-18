import RaceModel from '../models/RaceModel'

async function findRaceById(raceId: string) {
  return RaceModel.findById(raceId).lean().exec()
}

async function findRaceByName(name: string) {
  return RaceModel.findOne({ name }).lean().exec()
}

const playerRepository = {
  findRaceById,
  findRaceByName
}

export default playerRepository
