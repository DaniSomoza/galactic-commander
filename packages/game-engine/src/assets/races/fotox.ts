import {
  DEFAULT_FLEET_ENERGY,
  DEFAULT_INITIAL_RESOURCES,
  DEFAULT_RESOURCE_NAME,
  DEFAULT_TROOPS_POPULATION,
  IRace
} from '../../types/IRace'

const FOTOX_HULL_REGENERATION_BONUS = 20 // 20%
const FOTOX_INTERGALACTIC_TRAVEL_THRESHOLD = 12
const FOTOX_ALLOWED_PLANETS = 5

const fotox: IRace = {
  name: 'FOTOX_RACE_NAME',
  description: 'FOTOX_RACE_DESCRIPTION',
  tags: ['Aggressive', 'Colonizer'],
  maxPlanetsAllowed: FOTOX_ALLOWED_PLANETS,
  baseFleetEnergy: DEFAULT_FLEET_ENERGY,
  baseTroopsPopulation: DEFAULT_TROOPS_POPULATION,
  baseResources: DEFAULT_INITIAL_RESOURCES,
  resourceName: DEFAULT_RESOURCE_NAME,
  intergalacticTravelThreshold: FOTOX_INTERGALACTIC_TRAVEL_THRESHOLD,
  researches: [],

  units: [],

  specials: [],

  bonus: {
    FLEET_HULL_REGENERATION_BONUS: FOTOX_HULL_REGENERATION_BONUS
  }
}

export default fotox
