import {
  DEFAULT_ALLOWED_PLANETS,
  DEFAULT_FLEET_ENERGY,
  DEFAULT_INITIAL_RESOURCES,
  DEFAULT_RESOURCE_NAME,
  IRace
} from '../../types/IRace'
const SAURIANS_TROOPS_POPULATION = 15
const SAURIANS_INTERGALACTIC_TRAVEL_THRESHOLD = 13

const saurians: IRace = {
  name: 'SAURIANS_RACE_NAME',
  description: 'SAURIANS_RACE_DESCRIPTION',
  tags: ['Aggressive', 'Stealth'],
  maxPlanetsAllowed: DEFAULT_ALLOWED_PLANETS,
  baseFleetEnergy: DEFAULT_FLEET_ENERGY,
  baseTroopsPopulation: SAURIANS_TROOPS_POPULATION,
  baseResources: DEFAULT_INITIAL_RESOURCES,
  resourceName: DEFAULT_RESOURCE_NAME,
  intergalacticTravelThreshold: SAURIANS_INTERGALACTIC_TRAVEL_THRESHOLD,

  researches: [],

  units: [],

  specials: [],

  bonus: {
    // TODO: add bonus
  }
}

export default saurians
