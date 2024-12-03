import mongoose from 'mongoose'

import ResearchModel from '../models/ResearchModel'

async function findResearches() {
  return ResearchModel.find({}).exec()
}

async function findResearchesByRaceId(raceId: mongoose.Types.ObjectId) {
  return ResearchModel.findById(raceId).populate('researches').exec()
}

async function findResearchesByRaceName(name: string) {
  return ResearchModel.findOne({ name }).exec()
}

const researchRepository = {
  findResearches,
  findResearchesByRaceId,
  findResearchesByRaceName
}

export default researchRepository
