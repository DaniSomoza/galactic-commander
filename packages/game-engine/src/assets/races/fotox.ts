import {
  IRace,
  DEFAULT_FLEET_ENERGY,
  DEFAULT_RESOURCE_NAME,
  DEFAULT_INITIAL_RESOURCES,
  DEFAULT_TROOPS_POPULATION
} from '../../models/RaceModel'

const FOTOX_HULL_REGENERATION_BONUS = 20 // 20%
const FOTOX_INTERGALACTIC_TRAVEL_THRESHOLD = 12
const FOTOX_ALLOWED_PLANETS = 5

const fotox: IRace = {
  name: 'fotox',
  description: 'fotox race description',
  image: 'image_url',
  type: ['Aggressive', 'Colonizer'],
  maxPlanetsAllowed: FOTOX_ALLOWED_PLANETS,
  baseFleetEnergy: DEFAULT_FLEET_ENERGY,
  baseTroopsPopulation: DEFAULT_TROOPS_POPULATION,
  baseResources: DEFAULT_INITIAL_RESOURCES,
  resourceName: DEFAULT_RESOURCE_NAME,
  intergalacticTravelThreshold: FOTOX_INTERGALACTIC_TRAVEL_THRESHOLD,
  researches: [],

  bonus: {
    fleetHullRegenerationBonus: FOTOX_HULL_REGENERATION_BONUS
  }
}

export default fotox
