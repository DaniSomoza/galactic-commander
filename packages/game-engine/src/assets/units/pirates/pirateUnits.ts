import { IUnit } from '../../../types/IUnit'
import PIRATE_TROOPS_ATTACK_RESEARCH from '../../researches/pirates/pirate-troops-attack-research'
import PIRATE_TROOPS_HEALTH_RESEARCH from '../../researches/pirates/pirate-troops-health-research'
import PIRATE_TROOPS_POPULATION_RESEARCH from '../../researches/pirates/pirate-troops-population-research'
import PIRATE_TROOPS_SHIELD_RESEARCH from '../../researches/pirates/pirate-troops-shield-research'
import PIRATE_TROOPS_TRAINING_RESEARCH from '../../researches/pirates/pirate-troops-training-research'

// TODO: implement pirate heroes

// Pirate Cadet (Troop)
const pirateCadet: IUnit = {
  name: 'TROOP_PIRATE_CADET_NAME',
  description: 'TROOP_PIRATE_CADET_DESCRIPTION',

  raceName: 'PIRATES_RACE_NAME',

  type: 'TROOP',
  subtype: 'INFANTRY',

  resourceCost: 25,
  energyCost: 0,
  buildBaseTime: 100_000,

  stats: {
    attack: 10,
    shield: 0,
    health: 10,
    speed: 0,
    cargo: 0,
    starFighterCapacity: 0,
    troopsCapacity: 0
  },

  isHero: false,
  isInvisible: false,
  isOrganic: false,
  isCapturable: true,
  isKamikaze: false,
  isAirborne: false,
  isSpecial: false,
  hasShieldPiercing: false,

  requirements: {
    researches: [
      { level: 4, research: PIRATE_TROOPS_ATTACK_RESEARCH },
      { level: 2, research: PIRATE_TROOPS_SHIELD_RESEARCH },
      { level: 3, research: PIRATE_TROOPS_HEALTH_RESEARCH },
      { level: 1, research: PIRATE_TROOPS_POPULATION_RESEARCH },
      { level: 1, research: PIRATE_TROOPS_TRAINING_RESEARCH }
    ]
  },

  specials: [],

  bonus: {}
}

// Corsair (Troop)
const pirateCorsair: IUnit = {
  name: 'TROOP_PIRATE_CORSAIR_NAME',
  description: 'TROOP_PIRATE_CORSAIR_DESCRIPTION',

  raceName: 'PIRATES_RACE_NAME',

  type: 'TROOP',
  subtype: 'INFANTRY',

  resourceCost: 125,
  energyCost: 0,
  buildBaseTime: 300_000,

  stats: {
    attack: 30,
    shield: 5,
    health: 25,
    speed: 0,
    cargo: 0,
    starFighterCapacity: 0,
    troopsCapacity: 0
  },

  isHero: false,
  isInvisible: false,
  isOrganic: false,
  isCapturable: true,
  isKamikaze: false,
  isAirborne: false,
  isSpecial: false,
  hasShieldPiercing: false,

  requirements: {
    researches: [
      { level: 15, research: PIRATE_TROOPS_ATTACK_RESEARCH },
      { level: 14, research: PIRATE_TROOPS_SHIELD_RESEARCH },
      { level: 12, research: PIRATE_TROOPS_HEALTH_RESEARCH },
      { level: 11, research: PIRATE_TROOPS_POPULATION_RESEARCH },
      { level: 8, research: PIRATE_TROOPS_TRAINING_RESEARCH }
    ]
  },

  specials: [],

  bonus: {}
}

// Jack Spacerow (Hero Troop)
const pirateHero: IUnit = {
  name: 'TROOP_PIRATE_JACK_SPACEROW_HERO_NAME',
  description: 'TROOP_PIRATE_JACK_SPACEROW_HERO_DESCRIPTION',

  raceName: 'PIRATES_RACE_NAME',

  type: 'TROOP',
  subtype: 'INFANTRY',

  resourceCost: 1125,
  energyCost: 100,
  buildBaseTime: 500_000,

  stats: {
    attack: 130,
    shield: 50,
    health: 250,
    speed: 0,
    cargo: 0,
    starFighterCapacity: 0,
    troopsCapacity: 0
  },

  isHero: true,
  isInvisible: false,
  isOrganic: false,
  isCapturable: true,
  isKamikaze: false,
  isAirborne: false,
  isSpecial: false,
  hasShieldPiercing: false,

  requirements: {
    researches: [
      { level: 8, research: PIRATE_TROOPS_ATTACK_RESEARCH },
      { level: 5, research: PIRATE_TROOPS_SHIELD_RESEARCH },
      { level: 9, research: PIRATE_TROOPS_HEALTH_RESEARCH },
      { level: 4, research: PIRATE_TROOPS_POPULATION_RESEARCH },
      { level: 6, research: PIRATE_TROOPS_TRAINING_RESEARCH }
    ]
  },

  specials: [],

  bonus: {
    TROOPS_ATTACK_BONUS: 30,
    TROOPS_HEALTH_BONUS: 15,
    TROOPS_SHIELD_BONUS: 10
  }
}

// Pirate Recon Drone (Spaceship)

// Pirate Starfighter (Spaceship)

// Pirate Interceptor (Spaceship)

// Pirate Frigate (Spaceship)

// Pirate Defense (Defense)

const pirateTroops: IUnit[] = [
  pirateCadet,
  pirateCorsair,
  pirateHero
  // TODO: Add all units
]

const pirateSpaceships: IUnit[] = [
  // TODO: Add all units
]

const pirateDefenses: IUnit[] = [
  // TODO: Add all units
]

const pirateUnits = [...pirateTroops, ...pirateSpaceships, ...pirateDefenses]

export default pirateUnits
