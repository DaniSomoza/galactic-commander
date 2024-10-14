import raceRepository from 'game-engine/dist/repositories/raceRepository'
import universeRepository from 'game-engine/dist/repositories/universeRepository'

import { getGameInfoResponseType } from '../types/Universe'
import cleanRaceFields from '../utils/cleanRaceFields'
import cleanUniverseFields from '../utils/cleanUniverseFields'

async function getGameInfo(): Promise<getGameInfoResponseType> {
  const universes = await universeRepository.findUniverses()
  const races = await raceRepository.findRaces()

  return { universes: universes.map(cleanUniverseFields), races: races.map(cleanRaceFields) }
}

const gameInfoService = {
  getGameInfo
}

export default gameInfoService
