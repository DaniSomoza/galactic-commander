import {
  DEFAULT_FLEET_ENERGY,
  DEFAULT_INITIAL_RESOURCES,
  DEFAULT_RESOURCE_NAME,
  IRace
} from '../../types/IRace'

const HUMANS_ALLOWED_PLANETS = 5
const HUMANS_TROOPS_POPULATION = 15
const HUMANS_INTERGALACTIC_TRAVEL_THRESHOLD = 10

const humans: IRace = {
  name: 'HUMANS_RACE_NAME',
  description: 'HUMANS_RACE_DESCRIPTION',
  tags: ['Colonizer'], // TODO: get proper types
  maxPlanetsAllowed: HUMANS_ALLOWED_PLANETS,
  baseFleetEnergy: DEFAULT_FLEET_ENERGY,
  baseTroopsPopulation: HUMANS_TROOPS_POPULATION,
  baseResources: DEFAULT_INITIAL_RESOURCES,
  resourceName: DEFAULT_RESOURCE_NAME,
  intergalacticTravelThreshold: HUMANS_INTERGALACTIC_TRAVEL_THRESHOLD,

  researches: [],

  units: [],

  specials: [],

  bonus: {
    // TODO: add bonus ??
  }
}

export default humans
