import {
  DEFAULT_FLEET_ENERGY,
  DEFAULT_RESOURCE_NAME,
  DEFAULT_INITIAL_RESOURCES,
  DEFAULT_TROOPS_POPULATION,
  IRace
} from '../../models/RaceModel'

const CYBORGS_ALLOWED_PLANETS = 6
const CYBORGS_INTERGALACTIC_TRAVEL_THRESHOLD = 14
const CYBORGS_MAX_FLEETS_ALLOWED_BONUS = 2

const cyborgs: IRace = {
  name: 'cyborgs',
  description: 'cyborgs race description',
  image: 'image_url',
  type: ['Aggressive', 'Colonizer', 'Explorer'],
  maxPlanetsAllowed: CYBORGS_ALLOWED_PLANETS,
  baseFleetEnergy: DEFAULT_FLEET_ENERGY,
  baseTroopsPopulation: DEFAULT_TROOPS_POPULATION,
  baseResources: DEFAULT_INITIAL_RESOURCES,
  resourceName: DEFAULT_RESOURCE_NAME,
  intergalacticTravelThreshold: CYBORGS_INTERGALACTIC_TRAVEL_THRESHOLD,
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
    fleetHullRegenerationBonus: 0, // only for organic ships
    fleetShieldBonus: 0,
    fleetShieldPiercingBonus: false,
    fleetShieldRegenerationBonus: 0,
    fleetSpeedBonus: 0,
    fleetCargoBonus: 0,
    fleetBuildingBonus: 0,
    maxFleetsAllowedBonus: CYBORGS_MAX_FLEETS_ALLOWED_BONUS,
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

export default cyborgs
