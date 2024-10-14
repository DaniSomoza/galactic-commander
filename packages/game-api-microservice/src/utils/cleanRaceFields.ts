import { IRaceDocument } from 'game-engine/models/RaceModel'

import { RaceType } from '../types/Race'

function cleanRaceFields(race: IRaceDocument): RaceType {
  const {
    name,
    description,
    image,
    tags,
    maxPlanetsAllowed,
    baseFleetEnergy,
    baseTroopsPopulation,
    baseResources,
    resourceName,
    intergalacticTravelThreshold,
    researches,
    bonus
  } = race

  return {
    name,
    description,
    image,
    tags,
    maxPlanetsAllowed,
    baseFleetEnergy,
    baseTroopsPopulation,
    baseResources,
    resourceName,
    intergalacticTravelThreshold,
    researches,
    bonus
  }
}

export default cleanRaceFields
