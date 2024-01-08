import {
  DEFAULT_ALLOWED_PLANETS,
  DEFAULT_FLEET_ENERGY,
  DEFAULT_INITIAL_RESOURCES,
  DEFAULT_INTERGALACTIC_TRAVEL_THRESHOLD,
  DEFAULT_RESOURCE_NAME,
  DEFAULT_TROOPS_POPULATION,
  IRace
} from '../../models/RaceModel'

const PIRATE_CAPTURE_BONUS = 20 // 20 % ships capture

const pirates: IRace = {
  name: 'pirates',
  description: 'pirate race description',
  image: 'image_url',
  type: ['Aggressive', 'Raiders'],
  maxPlanetsAllowed: DEFAULT_ALLOWED_PLANETS,
  baseFleetEnergy: DEFAULT_FLEET_ENERGY,
  baseTroopsPopulation: DEFAULT_TROOPS_POPULATION,
  baseResources: DEFAULT_INITIAL_RESOURCES,
  resourceName: DEFAULT_RESOURCE_NAME,
  intergalacticTravelThreshold: DEFAULT_INTERGALACTIC_TRAVEL_THRESHOLD,
  researches: [],

  bonus: {
    // Capture Units Bonus
    fleetCaptureBonus: PIRATE_CAPTURE_BONUS
  }
}

export default pirates
