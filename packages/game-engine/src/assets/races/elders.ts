import {
  DEFAULT_RESOURCE_NAME,
  DEFAULT_ALLOWED_PLANETS,
  DEFAULT_INITIAL_RESOURCES,
  IRace
} from '../../models/RaceModel'

const ELDERS_FLEET_ENERGY = 150
const ELDERS_TROOPS_POPULATION = 50
const ELDERS_INTERGALACTIC_TRAVEL_THRESHOLD = 6
const ELDERS_RESEARCH_BONUS = 20 // 20 %

const elders: IRace = {
  name: 'elders',
  description: 'elders race description',
  image: 'image_url',
  type: ['Aggressive', 'Scientist'],
  maxPlanetsAllowed: DEFAULT_ALLOWED_PLANETS,
  baseFleetEnergy: ELDERS_FLEET_ENERGY,
  baseTroopsPopulation: ELDERS_TROOPS_POPULATION,
  baseResources: DEFAULT_INITIAL_RESOURCES,
  resourceName: DEFAULT_RESOURCE_NAME,
  intergalacticTravelThreshold: ELDERS_INTERGALACTIC_TRAVEL_THRESHOLD,
  researches: [],

  bonus: {
    researchBonus: ELDERS_RESEARCH_BONUS
  }
}

export default elders
