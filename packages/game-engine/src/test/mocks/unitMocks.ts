import PIRATE_TROOPS_ATTACK_RESEARCH from '../../assets/researches/pirates/pirate-troops-attack-research'
import PIRATE_TROOPS_POPULATION_RESEARCH from '../../assets/researches/pirates/pirate-troops-population-research'
import { IUnit } from '../../types/IUnit'

export const testRaceTroopUnit: IUnit = {
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
  isOrganic: true,
  isCapturable: true,
  isKamikaze: false,
  isAirborne: false,
  isSpecial: false,
  hasShieldPiercing: false,

  requirements: {
    researches: [
      { level: 2, research: PIRATE_TROOPS_ATTACK_RESEARCH },
      { level: 1, research: PIRATE_TROOPS_POPULATION_RESEARCH }
    ]
  },

  specials: [],

  bonus: {}
}

const ALL_UNITS_MOCK = [testRaceTroopUnit]

export default ALL_UNITS_MOCK
