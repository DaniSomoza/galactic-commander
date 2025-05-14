import { IBonus } from './IBonus'
import { ISpecial } from './ISpecial'
import { IPlayerResearch } from './IPlayer'

type UnitTroopType = 'TROOP'
type UnitSpaceshipType = 'SPACESHIP'
type UnitDefenseType = 'DEFENSE'

export type UnitTypes = UnitTroopType | UnitSpaceshipType | UnitDefenseType

type UnitStatsTypes = {
  attack: number
  shield: number
  health: number
  speed: number
  cargo: number
  starFighterCapacity: number
  troopsCapacity: number
}

// troops
type UnitTroopInfantrySubtype = 'INFANTRY'
type UnitTroopMedicSubtype = 'MEDIC'

// spaceship
type UnitSpaceshipProbeSubtype = 'PROBE'
type UnitSpaceshipStarFighterSubtype = 'STAR_FIGHTER'
type UnitSpaceshipCruiserSubtype = 'CRUISER'
type UnitSpaceshipFrigateSubtype = 'FRIGATE'
type UnitSpaceshipDestroyerSubtype = 'DESTROYER'
type UnitSpaceshipCarrierSubtype = 'CARRIER'
type UnitSpaceshipBattleStationSubtype = 'BATTLE_STATION'

// defenses
type UnitDefenseSubtype = 'DEFENSE'

type UnitSubtypes =
  | UnitTroopInfantrySubtype
  | UnitTroopMedicSubtype
  | UnitSpaceshipProbeSubtype
  | UnitSpaceshipStarFighterSubtype
  | UnitSpaceshipCruiserSubtype
  | UnitSpaceshipFrigateSubtype
  | UnitSpaceshipDestroyerSubtype
  | UnitSpaceshipCarrierSubtype
  | UnitSpaceshipBattleStationSubtype
  | UnitDefenseSubtype

export type BuildUnitsType = {
  unitId: string
  unitName: string
  unitType: UnitTypes
  amount: number
  taskId: string
  executeTaskAt: number
  energy: number
  resourceCost: number
}

export type BuildUnitsQueueType = {
  unitName: string
  amount: number
}

export interface IUnit {
  name: string
  description: string

  raceName?: string

  type: UnitTypes
  subtype: UnitSubtypes

  resourceCost: number
  energyCost: number
  buildBaseTime: number

  stats: UnitStatsTypes

  isHero: boolean
  isInvisible: boolean
  isOrganic: boolean
  isCapturable: boolean
  isKamikaze: boolean
  isAirborne: boolean
  isSpecial: boolean
  hasShieldPiercing: boolean

  requirements: {
    researches: IPlayerResearch[]
  }

  specials: ISpecial[]

  bonus: IBonus
}
