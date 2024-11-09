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
  name: 'FOTOX_RACE_NAME',
  description: 'FOTOX_RACE_DESCRIPTION',
  imgUrl: '/races/fotox_race.jpg',
  tags: ['Aggressive', 'Colonizer'],
  maxPlanetsAllowed: FOTOX_ALLOWED_PLANETS,
  baseFleetEnergy: DEFAULT_FLEET_ENERGY,
  baseTroopsPopulation: DEFAULT_TROOPS_POPULATION,
  baseResources: DEFAULT_INITIAL_RESOURCES,
  resourceName: DEFAULT_RESOURCE_NAME,
  intergalacticTravelThreshold: FOTOX_INTERGALACTIC_TRAVEL_THRESHOLD,
  researches: [],

  bonus: {
    FLEET_HULL_REGENERATION_BONUS: FOTOX_HULL_REGENERATION_BONUS
  }
}

export default fotox
