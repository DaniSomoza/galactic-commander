import createStartFleetTask from 'game-engine/dist/engine/tasks/utils/createStartFleetTask'
import universeRepository from 'game-engine/dist/repositories/universeRepository'
import playerRepository from 'game-engine/dist/repositories/playerRepository'
import planetRepository from 'game-engine/dist/repositories/planetRepository'
import unitRepository from 'game-engine/dist/repositories/unitRepository'
import taskRepository from 'game-engine/dist/repositories/taskRepository'
import { FleetTypes } from 'game-engine/dist/types/IFleet'
import NotFoundError from 'auth-microservice/dist/errors/NotFoundError'

import { PlanetCoordinatesType } from '../types/Planet'
import cleanTaskFields from '../utils/cleanTaskFields'

type explorePlanetServiceData = {
  username: string
  fleetUnits: { unitName: string; amount: number }[]
  universeName: string
  fromPlanetCoordinates: PlanetCoordinatesType
  toPlanetCoordinates: PlanetCoordinatesType
  executeTaskAt?: number
}

async function explorePlanet({
  username,
  fleetUnits,
  universeName,
  fromPlanetCoordinates,
  toPlanetCoordinates,
  executeTaskAt
}: explorePlanetServiceData) {
  const universe = await universeRepository.findUniverseByName(universeName)

  if (!universe) {
    throw new NotFoundError('invalid universe', { universeName })
  }

  const universeId = universe._id.toString()

  const player = await playerRepository.findPlayerByUsername(username, universeId)

  if (!player) {
    throw new NotFoundError('invalid player', { username, universeName })
  }

  const fromPlanet = await planetRepository.findPlanetByCoordinates(fromPlanetCoordinates)

  if (!fromPlanet) {
    throw new NotFoundError('invalid from planet', {
      username,
      fromPlanetCoordinates
    })
  }

  const toPlanet = await planetRepository.findPlanetByCoordinates(toPlanetCoordinates)

  if (!toPlanet) {
    throw new NotFoundError('invalid to planet', {
      username,
      toPlanetCoordinates
    })
  }

  const units = await unitRepository.findUnits()

  const fleetUnitsWithIds = fleetUnits.map(({ unitName, amount }) => {
    const unit = units.find((unit) => unit.name === unitName)

    if (!unit) {
      throw new NotFoundError('invalid unit', { unitName })
    }

    return {
      unit,
      amount
    }
  })

  const fleetData = {
    playerId: player._id.toString(),
    fromPlanetId: fromPlanet._id.toString(),
    toPlanetId: toPlanet._id.toString(),
    units: fleetUnitsWithIds,
    resources: 0,
    fleetType: 'EXPLORE_FLEET_TYPE' as FleetTypes
  }

  const startFleeTask = createStartFleetTask(universeId, fleetData, executeTaskAt)

  const newTask = await taskRepository.createStartFleetTask(startFleeTask)

  return { task: cleanTaskFields(newTask) }
}

const fleetService = {
  explorePlanet
}

export default fleetService
