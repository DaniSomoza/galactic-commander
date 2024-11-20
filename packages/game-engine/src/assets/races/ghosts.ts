import {
  IRace,
  DEFAULT_RESOURCE_NAME,
  DEFAULT_ALLOWED_PLANETS,
  DEFAULT_INITIAL_RESOURCES
} from '../../models/RaceModel'

// TODO: invisible units!
const GHOSTS_INTERGALACTIC_TRAVEL_THRESHOLD = 6
const GHOSTS_FLEET_ENERGY = 150
const GHOSTS_TROOPS_POPULATION = 50

const ghosts: IRace = {
  name: 'GHOSTS_RACE_NAME',
  description: 'GHOSTS_RACE_DESCRIPTION',
  tags: ['Aggressive', 'Stealth'],
  maxPlanetsAllowed: DEFAULT_ALLOWED_PLANETS,
  baseFleetEnergy: GHOSTS_FLEET_ENERGY,
  baseTroopsPopulation: GHOSTS_TROOPS_POPULATION,
  baseResources: DEFAULT_INITIAL_RESOURCES,
  resourceName: DEFAULT_RESOURCE_NAME,
  intergalacticTravelThreshold: GHOSTS_INTERGALACTIC_TRAVEL_THRESHOLD,
  researches: [],

  bonus: {
    STEALTH_FLEETS_BONUS: true
  }
}

export default ghosts
