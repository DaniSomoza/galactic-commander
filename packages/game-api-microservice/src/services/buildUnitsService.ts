import playerRepository from 'game-engine/dist/repositories/playerRepository'
import taskRepository from 'game-engine/dist/repositories/taskRepository'
import universeRepository from 'game-engine/dist/repositories/universeRepository'
import planetRepository from 'game-engine/dist/repositories/planetRepository'
import createStartBuildUnitsTask from 'game-engine/dist/engine/tasks/utils/createStartBuildUnitsTask'
import NotFoundError from 'auth-microservice/dist/errors/NotFoundError'
import BadRequestError from 'auth-microservice/dist/errors/BadRequestError'
import ConflictError from 'auth-microservice/dist/errors/ConflictError'

import cleanPlayerFields from '../utils/cleanPlayerFields'
import { startResearchResponseType, updateResearchQueueResponseType } from '../types/Research'
import cleanTaskFields from '../utils/cleanTaskFields'
import { UnitTypes } from '../types/Unit'
import { PlanetCoordinatesType } from '../types/Planet'

type BuildUnitsData = {
  username: string
  unitName: string
  unitType: UnitTypes
  amount: number
  universeName: string
  executeTaskAt?: number
  planetCoordinates: PlanetCoordinatesType
}

async function startBuildUnits({
  username,
  unitName,
  // unitType,
  amount,
  universeName,
  planetCoordinates,
  executeTaskAt
}: BuildUnitsData): Promise<startResearchResponseType> {
  const universe = await universeRepository.findUniverseByName(universeName)

  if (!universe) {
    throw new NotFoundError('invalid universe', { universeName })
  }

  const universeId = universe._id.toString()

  const player = await playerRepository.findPlayerByUsername(username, universeId)

  if (!player) {
    throw new NotFoundError('invalid player', { username, universeName })
  }

  const planet = await planetRepository.findPlanetByCoordinates(planetCoordinates)

  if (!planet) {
    throw new NotFoundError('invalid planet', {
      username,
      planetCoordinates
    })
  }

  const isValidPlanetOwner = planet.ownerId === player._id.toString()

  if (!isValidPlanetOwner) {
    throw new ConflictError('invalid planet owner', {
      username,
      planetCoordinates
    })
  }

  const raceUnit = player.race.units.find((unit) => unit.name === unitName)
  const planetUnit = planet.units.find((unit) => unit.name === unitName)

  const unit = raceUnit || planetUnit

  if (!unit) {
    throw new NotFoundError('invalid unit', { unitName })
  }

  if (executeTaskAt && executeTaskAt < new Date().getTime()) {
    throw new BadRequestError('invalid schedule', { executeTaskAt })
  }

  // TODO: checkActiveBuild ??? if executeTaskAt is not defined

  const startBuildUnitTask = createStartBuildUnitsTask(
    universeId,
    player._id.toString(),
    planet._id.toString(),
    unit._id.toString(),
    amount,
    executeTaskAt
  )

  const newTask = await taskRepository.createStartBuildUnitsTask(startBuildUnitTask)

  return { task: cleanTaskFields(newTask) }
}

type UpdateBuildUnitsQueueData = {
  username: string
  universeName: string
  unitType: UnitTypes
  buildUnitsQueue: {
    unitName: string
    amount: number
  }[]
  planetCoordinates: PlanetCoordinatesType
}

async function updateBuildUnitsQueue({
  username,
  universeName,
  unitType,
  buildUnitsQueue,
  planetCoordinates
}: UpdateBuildUnitsQueueData): Promise<updateResearchQueueResponseType> {
  const universe = await universeRepository.findUniverseByName(universeName)

  if (!universe) {
    throw new NotFoundError('invalid universe', { universeName })
  }

  const universeId = universe._id.toString()

  const player = await playerRepository.findPlayerByUsername(username, universeId)

  if (!player) {
    throw new NotFoundError('invalid player', { username, universeName })
  }

  const planet = await planetRepository.findPlanetByCoordinates(planetCoordinates)

  if (!planet) {
    throw new NotFoundError('invalid planet', {
      username,
      planetCoordinates
    })
  }

  const isValidPlanetOwner = planet.ownerId === player._id.toString()

  if (!isValidPlanetOwner) {
    throw new ConflictError('invalid planet owner', {
      username,
      planetCoordinates
    })
  }

  const isValidQueue = buildUnitsQueue.every(({ unitName }) => {
    const raceUnit = player.race.units.find((unit) => unit.name === unitName)
    const planetUnit = planet.units.find((unit) => unit.name === unitName)

    const unit = raceUnit || planetUnit

    return !!unit
  })

  if (!isValidQueue) {
    throw new NotFoundError('invalid build units queue', { buildUnitsQueue })
  }

  // update planet build units queue
  const path: Record<UnitTypes, 'troops' | 'spaceships' | 'defenses'> = {
    TROOP: 'troops',
    SPACESHIP: 'spaceships',
    DEFENSE: 'defenses'
  }

  planet.unitBuild[path[unitType]].queue = buildUnitsQueue

  if (!planet.unitBuild[path[unitType]].activeBuild) {
    // if no build is active, just start building the first unit in the queue
    const nextBuildUnits = planet.unitBuild[path[unitType]].queue.shift()
    if (nextBuildUnits) {
      await startBuildUnits({
        username,
        unitName: nextBuildUnits.unitName,
        amount: nextBuildUnits.amount,
        planetCoordinates,
        unitType,
        universeName
      })
    }
  }

  await planet.save()

  return { player: cleanPlayerFields(player) }
}

const buildUnitsService = {
  startBuildUnits,
  updateBuildUnitsQueue
}

export default buildUnitsService
