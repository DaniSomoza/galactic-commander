import FleetModel from '../models/FleetModel'

async function findFleetsByPlayerId(playerId: string) {
  return FleetModel.find({
    playerId,
    isFinished: false
  })
    .populate({
      path: 'units.unit',
      populate: {
        path: 'requirements.researches.research',
        model: 'Research'
      }
    })
    .populate('fromPlanet')
    .populate('toPlanet')
}

async function findFleetsByFromPlanetId(planetId: string) {
  return FleetModel.find({
    fromPlanet: planetId,
    isFinished: false
  })
    .populate({
      path: 'units.unit',
      populate: {
        path: 'requirements.researches.research',
        model: 'Research'
      }
    })
    .populate('fromPlanet')
    .populate('toPlanet')
}

async function findFleetsByToPlanetId(planetId: string) {
  return FleetModel.find({
    toPlanet: planetId,
    isFinished: false
  })
    .populate({
      path: 'units.unit',
      populate: {
        path: 'requirements.researches.research',
        model: 'Research'
      }
    })
    .populate('fromPlanet')
    .populate('toPlanet')
}

async function findFleetById(fleetId: string) {
  return FleetModel.findById(fleetId)
    .populate('player')
    .populate({
      path: 'units.unit',
      populate: {
        path: 'requirements.researches.research',
        model: 'Research'
      }
    })
    .populate('fromPlanet')
    .populate('toPlanet')
}

const fleetRepository = {
  findFleetById,
  findFleetsByPlayerId,
  findFleetsByToPlanetId,
  findFleetsByFromPlanetId
}

export default fleetRepository
