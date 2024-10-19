import mongoose from 'mongoose'

import PlayerModel from '../models/PlayerModel'

async function findPlayerByUsername(username: string, universeId: mongoose.Types.ObjectId) {
  return PlayerModel.findOne({ 'user.username': username, universe: universeId })
    .populate('planets.principal')
    .populate({
      path: 'planets.colonies'
    })
    .populate({
      path: 'race',
      populate: {
        path: 'researches',
        model: 'Research'
      }
    })
    .populate({
      path: 'researches.researched',
      populate: {
        path: 'research',
        model: 'Research'
      }
    })
    .populate({
      path: 'researches.activeResearch',
      populate: {
        path: 'research',
        model: 'Research'
      }
    })
    .exec()
}

async function findPlayerById(playerId: mongoose.Types.ObjectId) {
  return PlayerModel.findById(playerId)
    .populate('planets.principal')
    .populate({
      path: 'planets.colonies',
      populate: {
        path: 'owner',
        model: 'Player'
      }
    })
    .populate({
      path: 'race',
      populate: {
        path: 'researches',
        model: 'Research'
      }
    })
    .populate({
      path: 'researches.researched',
      populate: {
        path: 'research',
        model: 'Research'
      }
    })
    .populate({
      path: 'researches.activeResearch',
      populate: {
        path: 'research',
        model: 'Research'
      }
    })
    .exec()
}

const playerRepository = {
  findPlayerByUsername,
  findPlayerById
}

export default playerRepository
