import { IPlayerDocument } from 'game-engine/models/PlayerModel'

import { PlayerType } from '../types/Player'
import cleanPlanetFields from './cleanPlanetFields'
import cleanRaceFields from './cleanRaceFields'
import cleanFleetFields from './cleanFleetFields'
import cleanResearchFields from './cleanResearchFields'
import { IFleetDocument } from 'game-engine/models/FleetModel'
import { IPlayerUnits } from 'game-engine/types/IPlayerUnits'
import cleanUnitFields from './cleanUnitFields'

function cleanPlayerFields(
  player: IPlayerDocument,
  playerFleets: IFleetDocument[],
  playerUnits: IPlayerUnits[]
): PlayerType {
  const { user, universeId, race, planets, perks, researches } = player

  return {
    user,
    universeId,
    race: cleanRaceFields(race),
    planets: {
      principal: cleanPlanetFields(planets.principal, player),
      colonies: planets.colonies.map((colony) => cleanPlanetFields(colony, player))
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
    fleets: playerFleets.map((fleet) => cleanFleetFields(fleet, player)),

    units: playerUnits.map((playerUnits) => ({
      player: cleanPlayerFields(player, [], []),
      units: playerUnits.units.map(({ unit, amount }) => ({
        unit: cleanUnitFields(unit),
        amount
      })),
      planet: cleanPlanetFields(playerUnits.planet, player)
    }))
  }
}

export default cleanPlayerFields
