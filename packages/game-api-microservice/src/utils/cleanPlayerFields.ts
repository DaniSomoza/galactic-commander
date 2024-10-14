import { IPlayerDocument } from 'game-engine/models/PlayerModel'

import { PlayerType } from '../types/Player'
import cleanPlanetFields from './cleanPlanetFields'

function cleanPlayerFields(player: IPlayerDocument): PlayerType {
  const { user, race, universe, planets, bonus, points, researches, units } = player

  return {
    user,
    race,
    universe,
    planets: {
      principal: cleanPlanetFields(planets.principal),
      colonies: planets.colonies.map(cleanPlanetFields),
      explored: planets.explored.map((planetId) => planetId.toString())
    },
    bonus: bonus.map(({ bonus, type, source }) => ({ bonus, type, source: source.toString() })),
    points: points.map(({ points, second, type, source }) => ({
      points,
      second,
      type,
      source: source.toString()
    })),
    researches: {
      researched: researches.researched,
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
