import mongoose from 'mongoose'

import PlayerModel from '../models/PlayerModel'

async function findPlayerByUsername(username: string, universeId: mongoose.Types.ObjectId) {
  return PlayerModel.findOne({ username, universe: universeId })
    .populate('principalPlanet')
    .populate({
      path: 'race',
      populate: {
        path: 'researches',
        model: 'Research'
      }
    })
    .populate({
      path: 'researches',
      populate: {
        path: 'research',
        model: 'Research'
      }
    })
    .populate('activeResearch')
    .populate({
      path: 'planets',
      populate: {
        path: 'owner',
        model: 'Player'
      }
    })
    .exec()
}

async function findPlayerById(playerId: mongoose.Types.ObjectId) {
  return PlayerModel.findById(playerId)
    .populate('principalPlanet')
    .populate({
      path: 'race',
      populate: {
        path: 'researches',
        model: 'Research'
      }
    })
    .populate({
      path: 'researches',
      populate: {
        path: 'research'
      }
    })
    .populate('activeResearch')
    .populate({
      path: 'planets',
      populate: {
        path: 'owner',
        model: 'Player'
      }
    })
    .exec()
}

const playerRepository = {
  findPlayerByUsername,
  findPlayerById
}

export default playerRepository
