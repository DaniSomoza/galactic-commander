import PlayerModel from '../models/PlayerModel'

async function findPlayerByUsername(username: string, universeId: string) {
  return PlayerModel.findOne({ 'user.username': username, universeId })
    .populate({
      path: 'planets',
      populate: [
        {
          path: 'principal',
          model: 'Planet'
        },
        {
          path: 'colonies',
          model: 'Planet',
          populate: {
            path: 'units',
            model: 'Unit'
          }
        }
      ]
    })
    .populate({
      path: 'race',
      populate: [
        {
          path: 'researches',
          model: 'Research'
        },
        {
          path: 'units',
          model: 'Unit',
          populate: {
            path: 'requirements.researches.research',
            model: 'Research'
          }
        }
      ]
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
    .populate({
      path: 'fleets',
      populate: [
        {
          path: 'planet',
          model: 'Planet'
        },
        {
          path: 'units.unit',
          model: 'Unit',
          populate: {
            path: 'requirements.researches.research',
            model: 'Research'
          }
        },
        {
          path: 'travel.destination',
          model: 'Planet'
        }
      ]
    })
    .exec()
}

async function findPlayerById(playerId: string) {
  return PlayerModel.findById(playerId)
    .populate({
      path: 'planets',
      populate: [
        {
          path: 'principal',
          model: 'Planet'
        },
        {
          path: 'colonies',
          model: 'Planet',
          populate: {
            path: 'units',
            model: 'Unit'
          }
        }
      ]
    })
    .populate({
      path: 'race',
      populate: [
        {
          path: 'researches',
          model: 'Research'
        },
        {
          path: 'units',
          model: 'Unit',
          populate: {
            path: 'requirements.researches.research',
            model: 'Research'
          }
        }
      ]
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
    .populate({
      path: 'fleets',
      populate: [
        {
          path: 'planet',
          model: 'Planet'
        },
        {
          path: 'units.unit',
          model: 'Unit',
          populate: {
            path: 'requirements.researches.research',
            model: 'Research'
          }
        },
        {
          path: 'travel.destination',
          model: 'Planet'
        }
      ]
    })
    .exec()
}

const playerRepository = {
  findPlayerByUsername,
  findPlayerById
}

export default playerRepository
