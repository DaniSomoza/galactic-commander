import {
  IRace,
  DEFAULT_FLEET_ENERGY,
  DEFAULT_RESOURCE_NAME,
  DEFAULT_ALLOWED_PLANETS,
  DEFAULT_INITIAL_RESOURCES
} from '../../models/RaceModel'

const SAURIANS_TROOPS_POPULATION = 15
const SAURIANS_INTERGALACTIC_TRAVEL_THRESHOLD = 13

const saurians: IRace = {
  name: 'saurians',
  description: 'saurians race description',
  image: 'image_url',
  type: ['Aggressive', 'Stealth'],
  maxPlanetsAllowed: DEFAULT_ALLOWED_PLANETS,
  baseFleetEnergy: DEFAULT_FLEET_ENERGY,
  baseTroopsPopulation: SAURIANS_TROOPS_POPULATION,
  baseResources: DEFAULT_INITIAL_RESOURCES,
  resourceName: DEFAULT_RESOURCE_NAME,
  intergalacticTravelThreshold: SAURIANS_INTERGALACTIC_TRAVEL_THRESHOLD,
  researches: [],

  bonus: {
    // TODO: add bonus
  }
}

export default saurians
