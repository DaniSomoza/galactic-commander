import {
  IRace,
  DEFAULT_FLEET_ENERGY,
  DEFAULT_RESOURCE_NAME,
  DEFAULT_INITIAL_RESOURCES
} from '../../models/RaceModel'

const HUMANS_ALLOWED_PLANETS = 5
const HUMANS_TROOPS_POPULATION = 15
const HUMANS_INTERGALACTIC_TRAVEL_THRESHOLD = 10

const humans: IRace = {
  name: 'humans',
  description: 'humans race description',
  image: 'image_url',
  type: ['Colonizer'], // TODO: get proper types
  maxPlanetsAllowed: HUMANS_ALLOWED_PLANETS,
  baseFleetEnergy: DEFAULT_FLEET_ENERGY,
  baseTroopsPopulation: HUMANS_TROOPS_POPULATION,
  baseResources: DEFAULT_INITIAL_RESOURCES,
  resourceName: DEFAULT_RESOURCE_NAME,
  intergalacticTravelThreshold: HUMANS_INTERGALACTIC_TRAVEL_THRESHOLD,
  researches: [],

  bonus: {
    // TODO: add bonus ??
  }
}

export default humans
