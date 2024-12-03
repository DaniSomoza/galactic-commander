import { IPlayerDocument } from 'game-engine/models/PlayerModel'

import { PlayerType } from '../types/Player'
import cleanPlanetFields from './cleanPlanetFields'
import cleanRaceFields from './cleanRaceFields'
import cleanFleetFields from './cleanFleetFields'

function cleanPlayerFields(player: IPlayerDocument): PlayerType {
  const { user, race, universe, planets, perks, researches, fleets } = player

  return {
    user,
    race: cleanRaceFields(race),
    universe,
    planets: {
      principal: cleanPlanetFields(planets.principal),
      colonies: planets.colonies.map(cleanPlanetFields)
    },
    perks: perks.map(({ bonus, type, sourceName }) => ({ bonus, type, sourceName })),
    researches: {
      researched: researches.researched,
      queue: researches.queue,
      activeResearch: researches.activeResearch
        ? {
            research: researches.activeResearch.research,
            level: researches.activeResearch.level,
            executeTaskAt: researches.activeResearch.executeTaskAt,
            taskId: researches.activeResearch.taskId.toString()
          }
        : undefined
    },
    fleets: fleets.map(cleanFleetFields)
  }
}

export default cleanPlayerFields
