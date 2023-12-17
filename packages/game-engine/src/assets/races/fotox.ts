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
  // researches: [], // TBD migration
  // units: [], // TBD migration
  // specials: [], // TBD migration

  bonus: {
    researchBonus: 0,
    resourceProductionBonus: 0,
    stealthFleetsMode: false,
    stealthFleetsDetection: false,
    extraPlanetsBonus: 0,
    intergalacticTravelBonus: false,

    // Fleet Bonus
    fleetAttackBonus: 0,
    fleetHullBonus: 0,
    fleetHullRegenerationBonus: FOTOX_HULL_REGENERATION_BONUS, // only for organic ships
    fleetShieldBonus: 0,
    fleetShieldPiercingBonus: false,
    fleetShieldRegenerationBonus: 0,
    fleetSpeedBonus: 0,
    fleetCargoBonus: 0,
    fleetBuildingBonus: 0,
    maxFleetsAllowedBonus: 0,
    fleetEnergyBonus: 0,

    // Troops Bonus
    troopsAttackBonus: 0,
    troopsHealthBonus: 0,
    troopsHealthRegenerationBonus: 0, // medics ???
    troopsShieldBonus: 0,
    troopsShieldPiercingBonus: false,
    troopsShieldRegenerationBonus: 0,
    troopsTrainingBonus: 0,
    troopsPopulationBonus: 0,

    // Defenses Bonus
    defensesAttackBonus: 0,
    defensesHullBonus: 0,
    defensesShieldBonus: 0,
    defensesShieldRegenerationBonus: 0,
    defensesBuildingBonus: 0,

    // Capture Units Bonus
    fleetCaptureBonus: 0,
    spaceFighterCaptureBonus: 0,
    spaceCarrierCaptureBonus: 0,
    spaceCruiserCaptureBonus: 0,
    spaceDestroyerCaptureBonus: 0,
    spaceCargoCaptureBonus: 0,
    spaceFrigateCaptureBonus: 0,
    spacePlanetaryBomberCaptureBonus: 0,
    spaceBattleStationCaptureBonus: 0
  }
}

export default fotox
