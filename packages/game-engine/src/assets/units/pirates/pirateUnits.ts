import { IUnit } from '../../../types/IUnit'
import PIRATE_COMPUTING_RESEARCH from '../../researches/pirates/pirate-computing-research'
import PIRATE_DEFENSE_ATTACK_RESEARCH from '../../researches/pirates/pirate-defense-attack-research'
import PIRATE_DEFENSE_BUILDING_RESEARCH from '../../researches/pirates/pirate-defense-building-research'
import PIRATE_DEFENSE_HULL_RESEARCH from '../../researches/pirates/pirate-defense-hull-research'
import PIRATE_DEFENSE_SHIELD_RESEARCH from '../../researches/pirates/pirate-defense-shield-research'
import PIRATE_FLEET_ATTACK_RESEARCH from '../../researches/pirates/pirate-fleet-attack-research'
import PIRATE_FLEET_BUILDING_RESEARCH from '../../researches/pirates/pirate-fleet-building-research'
import PIRATE_FLEET_ENERGY_RESEARCH from '../../researches/pirates/pirate-fleet-energy-research'
import PIRATE_FLEET_HULL_RESEARCH from '../../researches/pirates/pirate-fleet-hull-research'
import PIRATE_FLEET_SHIELD_RESEARCH from '../../researches/pirates/pirate-fleet-shield-research'
import PIRATE_FLEET_SPEED_RESEARCH from '../../researches/pirates/pirate-fleet-speed-research'
import PIRATE_TROOPS_ATTACK_RESEARCH from '../../researches/pirates/pirate-troops-attack-research'
import PIRATE_TROOPS_HEALTH_RESEARCH from '../../researches/pirates/pirate-troops-health-research'
import PIRATE_TROOPS_POPULATION_RESEARCH from '../../researches/pirates/pirate-troops-population-research'
import PIRATE_TROOPS_SHIELD_RESEARCH from '../../researches/pirates/pirate-troops-shield-research'
import PIRATE_TROOPS_TRAINING_RESEARCH from '../../researches/pirates/pirate-troops-training-research'

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

// Pirate Officer (Troop)
const pirateOfficer: IUnit = {
  name: 'TROOP_PIRATE_OFFICER_NAME',
  description: 'TROOP_PIRATE_OFFICER_DESCRIPTION',

  raceName: 'PIRATES_RACE_NAME',

  type: 'TROOP',
  subtype: 'INFANTRY',

  resourceCost: 75,
  energyCost: 0,
  buildBaseTime: 200_000,

  stats: {
    attack: 20,
    shield: 0,
    health: 15,
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
      { level: 8, research: PIRATE_TROOPS_ATTACK_RESEARCH },
      { level: 9, research: PIRATE_TROOPS_SHIELD_RESEARCH },
      { level: 10, research: PIRATE_TROOPS_HEALTH_RESEARCH },
      { level: 7, research: PIRATE_TROOPS_POPULATION_RESEARCH },
      { level: 4, research: PIRATE_TROOPS_TRAINING_RESEARCH }
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
const pirateJackSpacerowHero: IUnit = {
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
  isCapturable: false,
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

// Barba Negra Blackbeard (Hero Troop)
const pirateBlackbeardHero: IUnit = {
  name: 'TROOP_PIRATE_BLACKBEARD_HERO_NAME',
  description: 'TROOP_PIRATE_BLACKBEARD_HERO_DESCRIPTION',

  raceName: 'PIRATES_RACE_NAME',

  type: 'TROOP',
  subtype: 'INFANTRY',

  resourceCost: 2_800,
  energyCost: 500,
  buildBaseTime: 800_000,

  stats: {
    attack: 230,
    shield: 80,
    health: 750,
    speed: 0,
    cargo: 0,
    starFighterCapacity: 0,
    troopsCapacity: 0
  },

  isHero: true,
  isInvisible: false,
  isOrganic: false,
  isCapturable: false,
  isKamikaze: false,
  isAirborne: false,
  isSpecial: false,
  hasShieldPiercing: false,

  requirements: {
    researches: [
      { level: 12, research: PIRATE_TROOPS_ATTACK_RESEARCH },
      { level: 7, research: PIRATE_TROOPS_SHIELD_RESEARCH },
      { level: 11, research: PIRATE_TROOPS_HEALTH_RESEARCH },
      { level: 9, research: PIRATE_TROOPS_POPULATION_RESEARCH },
      { level: 7, research: PIRATE_TROOPS_TRAINING_RESEARCH }
    ]
  },

  specials: [],

  bonus: {
    TROOPS_ATTACK_BONUS: 35,
    TROOPS_HEALTH_BONUS: 25,
    TROOPS_SHIELD_BONUS: 15
  }
}

// Luna Bane (Hero Troop)
const pirateLunaBaneHero: IUnit = {
  name: 'TROOP_PIRATE_LUNA_BANE_HERO_NAME',
  description: 'TROOP_PIRATE_LUNA_BANE_HERO_DESCRIPTION',

  raceName: 'PIRATES_RACE_NAME',

  type: 'TROOP',
  subtype: 'INFANTRY',

  resourceCost: 2_800,
  energyCost: 500,
  buildBaseTime: 800_000,

  stats: {
    attack: 200,
    shield: 80,
    health: 700,
    speed: 0,
    cargo: 0,
    starFighterCapacity: 0,
    troopsCapacity: 0
  },

  isHero: true,
  isInvisible: false,
  isOrganic: false,
  isCapturable: false,
  isKamikaze: false,
  isAirborne: false,
  isSpecial: false,
  hasShieldPiercing: false,

  requirements: {
    researches: [
      { level: 10, research: PIRATE_TROOPS_ATTACK_RESEARCH },
      { level: 8, research: PIRATE_TROOPS_SHIELD_RESEARCH },
      { level: 8, research: PIRATE_TROOPS_HEALTH_RESEARCH },
      { level: 9, research: PIRATE_TROOPS_POPULATION_RESEARCH },
      { level: 8, research: PIRATE_TROOPS_TRAINING_RESEARCH }
    ]
  },

  specials: [],

  bonus: {
    TROOPS_ATTACK_BONUS: 35,
    TROOPS_HEALTH_BONUS: 25,
    TROOPS_SHIELD_BONUS: 15
  }
}

// Henry Every (Rey de los piratas) (Hero Troop)
const pirateHenryEveryHero: IUnit = {
  name: 'TROOP_PIRATE_HENRY_EVERY_HERO_NAME',
  description: 'TROOP_PIRATE_HENRY_EVERY_HERO_DESCRIPTION',

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
  isCapturable: false,
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
const pirateReconDrone: IUnit = {
  name: 'SPACESHIP_PIRATE_RECON_DRONE_NAME',
  description: 'SPACESHIP_PIRATE_RECON_DRONE_DESCRIPTION',

  raceName: 'PIRATES_RACE_NAME',

  type: 'SPACESHIP',
  subtype: 'PROBE',

  resourceCost: 100,
  energyCost: 25,
  buildBaseTime: 100_000,

  stats: {
    attack: 1,
    shield: 0,
    health: 10,
    speed: 1_000,
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
      { level: 1, research: PIRATE_COMPUTING_RESEARCH },
      { level: 1, research: PIRATE_FLEET_ENERGY_RESEARCH },
      { level: 2, research: PIRATE_FLEET_BUILDING_RESEARCH },
      { level: 2, research: PIRATE_FLEET_HULL_RESEARCH },
      { level: 3, research: PIRATE_FLEET_SPEED_RESEARCH }
    ]
  },

  specials: [],

  bonus: {}
}

// Pirate Star fighter (Spaceship)
const pirateStarFighter: IUnit = {
  name: 'SPACESHIP_PIRATE_STAR_FIGHTER_NAME',
  description: 'SPACESHIP_PIRATE_STAR_FIGHTER_DESCRIPTION',

  raceName: 'PIRATES_RACE_NAME',

  type: 'SPACESHIP',
  subtype: 'STAR_FIGHTER',

  energyCost: 105,
  resourceCost: 300,
  buildBaseTime: 300_000,

  stats: {
    attack: 165,
    shield: 15,
    health: 260,
    speed: 45,
    cargo: 50,
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
      { level: 3, research: PIRATE_FLEET_ATTACK_RESEARCH },
      { level: 1, research: PIRATE_FLEET_SHIELD_RESEARCH },
      { level: 3, research: PIRATE_FLEET_HULL_RESEARCH },
      { level: 3, research: PIRATE_FLEET_ENERGY_RESEARCH },
      { level: 4, research: PIRATE_FLEET_BUILDING_RESEARCH },
      { level: 3, research: PIRATE_FLEET_SPEED_RESEARCH }
    ]
  },

  specials: [],

  bonus: {}
}

// Pirate Interceptor (Spaceship)
const pirateInterceptor: IUnit = {
  name: 'SPACESHIP_PIRATE_INTERCEPTOR_NAME',
  description: 'SPACESHIP_PIRATE_INTERCEPTOR_DESCRIPTION',

  raceName: 'PIRATES_RACE_NAME',

  type: 'SPACESHIP',
  subtype: 'STAR_FIGHTER',

  energyCost: 120,
  resourceCost: 350,
  buildBaseTime: 350_000,

  stats: {
    attack: 170,
    shield: 30,
    health: 290,
    speed: 50,
    cargo: 50,
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
      { level: 4, research: PIRATE_FLEET_ATTACK_RESEARCH },
      { level: 2, research: PIRATE_FLEET_SHIELD_RESEARCH },
      { level: 4, research: PIRATE_FLEET_HULL_RESEARCH },
      { level: 5, research: PIRATE_FLEET_ENERGY_RESEARCH },
      { level: 5, research: PIRATE_FLEET_BUILDING_RESEARCH },
      { level: 6, research: PIRATE_FLEET_SPEED_RESEARCH }
    ]
  },

  specials: [],

  bonus: {}
}

// Pirate Cruiser (Spaceship)
const pirateCruiser: IUnit = {
  name: 'SPACESHIP_PIRATE_CRUISER_NAME',
  description: 'SPACESHIP_PIRATE_CRUISER_DESCRIPTION',

  raceName: 'PIRATES_RACE_NAME',

  type: 'SPACESHIP',
  subtype: 'CRUISER',

  energyCost: 350,
  resourceCost: 900,
  buildBaseTime: 1_000_000,

  stats: {
    attack: 350,
    shield: 85,
    health: 1_000,
    speed: 300,
    cargo: 400,
    starFighterCapacity: 0,
    troopsCapacity: 7
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
      { level: 3, research: PIRATE_FLEET_ATTACK_RESEARCH },
      { level: 2, research: PIRATE_FLEET_SHIELD_RESEARCH },
      { level: 3, research: PIRATE_FLEET_HULL_RESEARCH },
      { level: 4, research: PIRATE_FLEET_ENERGY_RESEARCH },
      { level: 5, research: PIRATE_FLEET_BUILDING_RESEARCH },
      { level: 7, research: PIRATE_FLEET_SPEED_RESEARCH }
    ]
  },

  specials: [],

  bonus: {}
}

const pirateBrigantine: IUnit = {
  name: 'SPACESHIP_PIRATE_BRIGANTINE_NAME',
  description: 'SPACESHIP_PIRATE_BRIGANTINE_DESCRIPTION',

  raceName: 'PIRATES_RACE_NAME',

  type: 'SPACESHIP',
  subtype: 'FRIGATE',

  energyCost: 750,
  resourceCost: 2_800,
  buildBaseTime: 2_500_000,

  stats: {
    attack: 700,
    shield: 140,
    health: 2_000,
    speed: 1_000,
    cargo: 1_000,
    starFighterCapacity: 10,
    troopsCapacity: 20
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
      { level: 4, research: PIRATE_FLEET_ATTACK_RESEARCH },
      { level: 2, research: PIRATE_FLEET_SHIELD_RESEARCH },
      { level: 4, research: PIRATE_FLEET_HULL_RESEARCH },
      { level: 5, research: PIRATE_FLEET_ENERGY_RESEARCH },
      { level: 5, research: PIRATE_FLEET_BUILDING_RESEARCH },
      { level: 6, research: PIRATE_FLEET_SPEED_RESEARCH }
    ]
  },

  specials: [],

  bonus: {}
}

// Pirate Imperial Corsair Frigate (Spaceship)
const pirateImperialCorsairFrigate: IUnit = {
  name: 'SPACESHIP_PIRATE_IMPERIAL_CORSAIR_FRIGATE_NAME',
  description: 'SPACESHIP_PIRATE_IMPERIAL_CORSAIR_FRIGATE_DESCRIPTION',

  raceName: 'PIRATES_RACE_NAME',

  type: 'SPACESHIP',
  subtype: 'FRIGATE',

  energyCost: 2_700,
  resourceCost: 10_000,
  buildBaseTime: 6_000_000,

  stats: {
    attack: 2_600,
    shield: 780,
    health: 7_500,
    speed: 1_500,
    cargo: 7_000,
    starFighterCapacity: 35,
    troopsCapacity: 70
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
      { level: 7, research: PIRATE_FLEET_ATTACK_RESEARCH },
      { level: 3, research: PIRATE_FLEET_SHIELD_RESEARCH },
      { level: 6, research: PIRATE_FLEET_HULL_RESEARCH },
      { level: 8, research: PIRATE_FLEET_ENERGY_RESEARCH },
      { level: 6, research: PIRATE_FLEET_BUILDING_RESEARCH },
      { level: 9, research: PIRATE_FLEET_SPEED_RESEARCH }
    ]
  },

  specials: [],

  bonus: {}
}

// Queen Anne's Revenge Hero Frigate (Spaceship)
const pirateQueenAnneRevengeHero: IUnit = {
  name: 'SPACESHIP_PIRATE_QUEEN_ANNES_REVENGE_HERO_NAME',
  description: 'SPACESHIP_PIRATE_QUEEN_ANNES_REVENGE_HERO_DESCRIPTION',

  raceName: 'PIRATES_RACE_NAME',

  type: 'SPACESHIP',
  subtype: 'FRIGATE',

  energyCost: 5_000,
  resourceCost: 20_000,
  buildBaseTime: 20_000_000,

  stats: {
    attack: 16_000,
    shield: 3_500,
    health: 50_000,
    speed: 2_000,
    cargo: 30_000,
    starFighterCapacity: 120,
    troopsCapacity: 150
  },

  isHero: true,
  isInvisible: false,
  isOrganic: false,
  isCapturable: false,
  isKamikaze: false,
  isAirborne: false,
  isSpecial: false,
  hasShieldPiercing: false,

  requirements: {
    researches: [
      { level: 11, research: PIRATE_FLEET_ATTACK_RESEARCH },
      { level: 7, research: PIRATE_FLEET_SHIELD_RESEARCH },
      { level: 10, research: PIRATE_FLEET_HULL_RESEARCH },
      { level: 12, research: PIRATE_FLEET_ENERGY_RESEARCH },
      { level: 6, research: PIRATE_FLEET_BUILDING_RESEARCH },
      { level: 12, research: PIRATE_FLEET_SPEED_RESEARCH }
    ]
  },

  specials: [],

  bonus: {
    FLEET_ATTACK_BONUS: 35,
    FLEET_SHIELD_BONUS: 10,
    FLEET_CARGO_BONUS: 20,
    FLEET_SPEED_BONUS: 25
  }
}

// Royal Fortune Hero Frigate (Spaceship)
const pirateRoyalFortuneHero: IUnit = {
  name: 'SPACESHIP_PIRATE_ROYAL_FORTUNE_HERO_NAME',
  description: 'SPACESHIP_PIRATE_ROYAL_FORTUNE_HERO_DESCRIPTION',

  raceName: 'PIRATES_RACE_NAME',

  type: 'SPACESHIP',
  subtype: 'FRIGATE',

  energyCost: 8_000,
  resourceCost: 30_000,
  buildBaseTime: 30_000_000,

  stats: {
    attack: 25_000,
    shield: 6_000,
    health: 80_000,
    speed: 2_100,
    cargo: 50_000,
    starFighterCapacity: 150,
    troopsCapacity: 200
  },

  isHero: true,
  isInvisible: false,
  isOrganic: false,
  isCapturable: false,
  isKamikaze: false,
  isAirborne: false,
  isSpecial: false,
  hasShieldPiercing: false,

  requirements: {
    researches: [
      { level: 16, research: PIRATE_FLEET_ATTACK_RESEARCH },
      { level: 14, research: PIRATE_FLEET_SHIELD_RESEARCH },
      { level: 15, research: PIRATE_FLEET_HULL_RESEARCH },
      { level: 17, research: PIRATE_FLEET_ENERGY_RESEARCH },
      { level: 11, research: PIRATE_FLEET_BUILDING_RESEARCH },
      { level: 16, research: PIRATE_FLEET_SPEED_RESEARCH }
    ]
  },

  specials: [],

  bonus: {
    FLEET_ATTACK_BONUS: 20,
    FLEET_SHIELD_BONUS: 10,
    FLEET_CARGO_BONUS: 10,
    FLEET_SPEED_BONUS: 35
  }
}

// The Stellar Spectre Hero Frigate (Spaceship)
const pirateStellarSpectreHero: IUnit = {
  name: 'SPACESHIP_PIRATE_THE_STELLAR_SPECTRE_HERO_NAME',
  description: 'SPACESHIP_PIRATE_THE_STELLAR_SPECTRE_HERO_DESCRIPTION',

  raceName: 'PIRATES_RACE_NAME',

  type: 'SPACESHIP',
  subtype: 'FRIGATE',

  energyCost: 10_000,
  resourceCost: 50_000,
  buildBaseTime: 50_000_000,

  stats: {
    attack: 32_000,
    shield: 8_000,
    health: 100_000,
    speed: 2_200,
    cargo: 80_000,
    starFighterCapacity: 180,
    troopsCapacity: 250
  },

  isHero: true,
  isInvisible: true,
  isOrganic: false,
  isCapturable: false,
  isKamikaze: false,
  isAirborne: false,
  isSpecial: false,
  hasShieldPiercing: false,

  requirements: {
    researches: [
      { level: 19, research: PIRATE_FLEET_ATTACK_RESEARCH },
      { level: 17, research: PIRATE_FLEET_SHIELD_RESEARCH },
      { level: 19, research: PIRATE_FLEET_HULL_RESEARCH },
      { level: 22, research: PIRATE_FLEET_ENERGY_RESEARCH },
      { level: 16, research: PIRATE_FLEET_BUILDING_RESEARCH },
      { level: 20, research: PIRATE_FLEET_SPEED_RESEARCH }
    ]
  },

  specials: [
    // TODO: ADD A SPECIAL: STEALTH FLEETS 30 mins, cooldown: 1 week
  ],

  bonus: {
    FLEET_ATTACK_BONUS: 15,
    FLEET_SHIELD_BONUS: 10,
    FLEET_SPEED_BONUS: 35
  }
}

// Pirate Defense (Defense)
const pirateLaserCannon: IUnit = {
  name: 'DEFENSE_PIRATE_LASER_CANNON_NAME',
  description: 'DEFENSE_PIRATE_LASER_CANNON_DESCRIPTION',

  raceName: 'PIRATES_RACE_NAME',

  type: 'DEFENSE',
  subtype: 'DEFENSE',

  resourceCost: 300,
  energyCost: 50,
  buildBaseTime: 70_000,

  stats: {
    attack: 100,
    shield: 15,
    health: 70,
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
      { level: 3, research: PIRATE_DEFENSE_BUILDING_RESEARCH },
      { level: 3, research: PIRATE_DEFENSE_ATTACK_RESEARCH },
      { level: 2, research: PIRATE_DEFENSE_HULL_RESEARCH },
      { level: 1, research: PIRATE_DEFENSE_SHIELD_RESEARCH }
    ]
  },

  specials: [],

  bonus: {}
}

const pirateTroops: IUnit[] = [
  pirateCadet,
  pirateOfficer,
  pirateCorsair,
  pirateJackSpacerowHero,
  pirateBlackbeardHero,
  pirateLunaBaneHero,
  pirateHenryEveryHero
]

const pirateSpaceships: IUnit[] = [
  pirateReconDrone,
  pirateStarFighter,
  pirateInterceptor,
  pirateCruiser,
  pirateBrigantine,
  pirateImperialCorsairFrigate,
  pirateQueenAnneRevengeHero,
  pirateRoyalFortuneHero,
  pirateStellarSpectreHero
]

const pirateDefenses: IUnit[] = [pirateLaserCannon]

const pirateUnits = [...pirateTroops, ...pirateSpaceships, ...pirateDefenses]

export default pirateUnits
