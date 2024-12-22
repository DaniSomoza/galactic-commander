import { IPlayerDocument } from 'game-engine/models/PlayerModel'

import { PlayerType } from '../types/Player'
import cleanPlanetFields from './cleanPlanetFields'
import cleanRaceFields from './cleanRaceFields'
import cleanFleetFields from './cleanFleetFields'
import cleanResearchFields from './cleanResearchFields'

function cleanPlayerFields(player: IPlayerDocument): PlayerType {
  const { user, universeId, race, planets, perks, researches, fleets } = player

  return {
    user,
    universeId,
    race: cleanRaceFields(race),
    planets: {
      principal: cleanPlanetFields(planets.principal),
      colonies: planets.colonies.map(cleanPlanetFields)
    },
    perks,
    researches: {
      researched: researches.researched.map((researched) => ({
        research: cleanResearchFields(researched.research),
        level: researched.level
      })),
      queue: researches.queue,
      activeResearch: researches.activeResearch
        ? {
            research: cleanResearchFields(researches.activeResearch.research),
            level: researches.activeResearch.level,
            executeTaskAt: researches.activeResearch.executeTaskAt,
            taskId: researches.activeResearch.taskId
          }
        : undefined
    },
    fleets: fleets.map(cleanFleetFields)
  }
}

export default cleanPlayerFields
