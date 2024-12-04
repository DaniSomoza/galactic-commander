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

// TODO: troops subtypes
type UnitTroopInfantrySubtype = 'INFANTRY'
type UnitTroopMedicSubtype = 'MEDIC'

// TODO: spaceship subtypes
type UnitSpaceshipProbeSubtype = 'PROBE'
type UnitSpaceshipStarFighterSubtype = 'STAR_FIGHTER'
// TODO: Implement the INTERCEPTOR_STAR_FIGHTER subtype to be effective against other StarFighters and less effective against other unit types.
type UnitSpaceshipCruiserSubtype = 'CRUISER'
type UnitSpaceshipBattleStationSubtype = 'BATTLE_STATION'

// TODO: defenses subtypes
type UnitDefenseSubtype = 'DEFENSE'

// export type SpaceScoutDrone = 'spaceScoutDrone'
// export type SpaceFighter = 'spaceFighter'
// export type SpaceCarrier = 'spaceCarrier'
// export type SpaceCruiser = 'spaceCruiser'
// export type SpaceDestroyer = 'spaceDestroyer'
// export type SpaceFrigate = 'spaceFrigate'
// export type SpaceBattleStation = 'spaceBattleStation'
// export type SpacePlanetaryBomber = 'spacePlanetaryBomber'
// export type SpaceCargo = 'spaceCargo'

// // TODO: move this to Units ?
// export type ShipsTypes =
//   | SpaceScoutDrone
//   | SpaceFighter
//   | SpaceCarrier
//   | SpaceCruiser
//   | SpaceDestroyer
//   | SpaceFrigate
//   | SpaceBattleStation
//   | SpacePlanetaryBomber
//   | SpaceCargo

type UnitSubtypes =
  | UnitTroopInfantrySubtype
  | UnitTroopMedicSubtype
  | UnitSpaceshipProbeSubtype
  | UnitSpaceshipStarFighterSubtype
  | UnitSpaceshipCruiserSubtype
  | UnitSpaceshipBattleStationSubtype
  | UnitDefenseSubtype

export type BuildUnitsType = {
  unitId: string
  unitType: UnitTypes
  amount: number
  taskId: string
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
