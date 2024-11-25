import { IUnit } from '../../../types/IUnit'

// TODO: implement pirate heroes

// Pirate Cadet (Troop)
const pirateCadet: IUnit = {
  name: 'TROOP_PIRATE_CADET_NAME',
  description: 'TROOP_PIRATE_CADET_DESCRIPTION',

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
      // TODO: add this
      // { level: 1, research: {} }
    ]
  },

  specials: []
}

// Pirate Officer (Troop)

// Corsair (Troop)

// Pirate Recon Drone (Spaceship)

// Pirate Starfighter (Spaceship)

// Pirate Interceptor (Spaceship)

// Pirate Frigate (Spaceship)

// Pirate Defense (Defense)

const pirateTroops: IUnit[] = [
  pirateCadet
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
