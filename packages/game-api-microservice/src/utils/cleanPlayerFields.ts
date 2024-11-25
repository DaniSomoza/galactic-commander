import { IPlayerDocument } from 'game-engine/models/PlayerModel'

import { PlayerType } from '../types/Player'
import cleanPlanetFields from './cleanPlanetFields'

function cleanPlayerFields(player: IPlayerDocument): PlayerType {
  const { user, race, universe, planets, perks, researches, units } = player

  return {
    user,
    race,
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
    units
  }
}

export default cleanPlayerFields
