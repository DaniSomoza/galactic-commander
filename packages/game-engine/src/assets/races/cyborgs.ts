import {
  DEFAULT_FLEET_ENERGY,
  DEFAULT_RESOURCE_NAME,
  DEFAULT_INITIAL_RESOURCES,
  DEFAULT_TROOPS_POPULATION,
  IRace
} from '../../models/RaceModel'

const CYBORGS_ALLOWED_PLANETS = 6
const CYBORGS_INTERGALACTIC_TRAVEL_THRESHOLD = 14
const CYBORGS_MAX_FLEETS_ALLOWED_BONUS = 3

const cyborgs: IRace = {
  name: 'CYBORGS_RACE_NAME',
  description: 'CYBORGS_RACE_DESCRIPTION',
  imgUrl: '/races/cyborgs_race.jpg',
  tags: ['Aggressive', 'Colonizer', 'Explorer'],
  maxPlanetsAllowed: CYBORGS_ALLOWED_PLANETS,
  baseFleetEnergy: DEFAULT_FLEET_ENERGY,
  baseTroopsPopulation: DEFAULT_TROOPS_POPULATION,
  baseResources: DEFAULT_INITIAL_RESOURCES,
  resourceName: DEFAULT_RESOURCE_NAME,
  intergalacticTravelThreshold: CYBORGS_INTERGALACTIC_TRAVEL_THRESHOLD,
  researches: [],

  bonus: {
    maxFleetsAllowedBonus: CYBORGS_MAX_FLEETS_ALLOWED_BONUS
  }
}

export default cyborgs
