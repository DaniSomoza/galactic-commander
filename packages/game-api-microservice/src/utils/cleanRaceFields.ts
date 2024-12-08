import { IRaceDocument } from 'game-engine/models/RaceModel'

import { RaceType } from '../types/Race'
import cleanUnitFields from './cleanUnitFields'
import cleanResearchFields from './cleanResearchFields'

function cleanRaceFields(race: IRaceDocument): RaceType {
  const {
    name,
    description,
    tags,
    maxPlanetsAllowed,
    baseFleetEnergy,
    baseTroopsPopulation,
    baseResources,
    resourceName,
    intergalacticTravelThreshold,
    researches,
    bonus,
    specials,
    units
  } = race

  return {
    name,
    description,
    tags,
    maxPlanetsAllowed,
    baseFleetEnergy,
    baseTroopsPopulation,
    baseResources,
    resourceName,
    intergalacticTravelThreshold,
    researches: researches.map(cleanResearchFields),
    units: units.map(cleanUnitFields),
    specials,
    bonus
  }
}

export default cleanRaceFields
