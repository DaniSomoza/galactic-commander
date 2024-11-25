import {
  DEFAULT_ALLOWED_PLANETS,
  DEFAULT_FLEET_ENERGY,
  DEFAULT_INITIAL_RESOURCES,
  DEFAULT_INTERGALACTIC_TRAVEL_THRESHOLD,
  DEFAULT_RESOURCE_NAME,
  DEFAULT_TROOPS_POPULATION,
  IRace
} from '../../types/IRace'

const FLEET_CAPTURE_BONUS = 20 // +20% ships capture
const TROOPS_ATTACK_BONUS = 10 // +10% troops attack bonus

const pirates: IRace = {
  name: 'PIRATES_RACE_NAME',
  description: 'PIRATES_RACE_DESCRIPTION',
  tags: ['Aggressive', 'Raiders'],
  maxPlanetsAllowed: DEFAULT_ALLOWED_PLANETS,
  baseFleetEnergy: DEFAULT_FLEET_ENERGY,
  baseTroopsPopulation: DEFAULT_TROOPS_POPULATION,
  baseResources: DEFAULT_INITIAL_RESOURCES,
  resourceName: DEFAULT_RESOURCE_NAME,
  intergalacticTravelThreshold: DEFAULT_INTERGALACTIC_TRAVEL_THRESHOLD,

  researches: [],

  units: [],

  specials: [],

  bonus: {
    FLEET_CAPTURE_BONUS,
    TROOPS_ATTACK_BONUS
  }
}

export default pirates
