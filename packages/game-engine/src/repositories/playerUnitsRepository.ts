import PlayerUnitsModel from '../models/PlayerUnitsModel'

async function findPlayerUnitsById(unitsInThePlanetId: string) {
  return PlayerUnitsModel.findById(unitsInThePlanetId)
    .populate('player')
    .populate({
      path: 'units.unit',
      populate: {
        path: 'requirements.researches.research',
        model: 'Research'
      }
    })
    .populate('planet')
}

async function findPlayerUnits(playerId: string) {
  return PlayerUnitsModel.find({
    player: playerId
  })
    .populate('player')
    .populate({
      path: 'units.unit',
      populate: {
        path: 'requirements.researches.research',
        model: 'Research'
      }
    })
    .populate('planet')
}

async function findUnitsInThePlanet(planetId: string) {
  return PlayerUnitsModel.find({
    planet: planetId
  })
    .populate('player')
    .populate({
      path: 'units.unit',
      populate: {
        path: 'requirements.researches.research',
        model: 'Research'
      }
    })
    .populate('planet')
}

async function findPlayerUnitsInThePlanet(playerId: string, planetId: string) {
  return PlayerUnitsModel.findOne({
    player: playerId,
    planet: planetId
  })
    .populate('player')
    .populate({
      path: 'units.unit',
      populate: {
        path: 'requirements.researches.research',
        model: 'Research'
      }
    })
    .populate('planet')
}

const playerUnitsRepository = {
  findPlayerUnitsById,
  findPlayerUnits,
  findUnitsInThePlanet,
  findPlayerUnitsInThePlanet
}

export default playerUnitsRepository
