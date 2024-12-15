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
const pirateReconDrone: IUnit = {
  name: 'SPACESHIP_PIRATE_RECON_DRONE_NAME',
  description: 'SPACESHIP_PIRATE_RECON_DRONE_DESCRIPTION',

  raceName: 'PIRATES_RACE_NAME',

  type: 'SPACESHIP',
  subtype: 'PROBE',

  resourceCost: 30,
  energyCost: 10,
  buildBaseTime: 50_000,

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

  resourceCost: 140,
  energyCost: 110,
  buildBaseTime: 500_000,

  stats: {
    attack: 170,
    shield: 15,
    health: 150,
    speed: 100,
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

  resourceCost: 140,
  energyCost: 110,
  buildBaseTime: 500_000,

  stats: {
    attack: 270,
    shield: 25,
    health: 170,
    speed: 120,
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

  resourceCost: 700,
  energyCost: 350,
  buildBaseTime: 400_000,

  stats: {
    attack: 350,
    shield: 80,
    health: 270,
    speed: 140,
    cargo: 500,
    starFighterCapacity: 0,
    troopsCapacity: 5
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

// Pirate Frigate (Spaceship)
const pirateFrigate: IUnit = {
  name: 'SPACESHIP_PIRATE_FRIGATE_NAME',
  description: 'SPACESHIP_PIRATE_FRIGATE_DESCRIPTION',

  raceName: 'PIRATES_RACE_NAME',

  type: 'SPACESHIP',
  subtype: 'FRIGATE',

  resourceCost: 1_500,
  energyCost: 500,
  buildBaseTime: 700_000,

  stats: {
    attack: 550,
    shield: 80,
    health: 370,
    speed: 120,
    cargo: 1_500,
    starFighterCapacity: 18,
    troopsCapacity: 35
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
  pirateHero
  // TODO: Add all units
]

const pirateSpaceships: IUnit[] = [
  pirateReconDrone,
  pirateStarFighter,
  pirateInterceptor,
  pirateCruiser,
  pirateFrigate
  // TODO: Add all units
]

const pirateDefenses: IUnit[] = [
  pirateLaserCannon
  // TODO: Add all units
]

const pirateUnits = [...pirateTroops, ...pirateSpaceships, ...pirateDefenses]

export default pirateUnits
