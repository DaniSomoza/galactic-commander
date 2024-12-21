import { IBonus } from 'game-engine/dist/types/IBonus'

import { PlayerResearchType, PlayerType } from './Player'
import { SpecialType } from './Special'
import { PlanetCoordinatesType } from './Planet'
import { StartBuildUnitsTaskType, TaskType } from './Task'

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

// TODO: avoid duplicates?

// TODO: troops subtypes
type UnitTroopInfantrySubtype = 'INFANTRY'
type UnitTroopMedicSubtype = 'MEDIC'

// TODO: spaceship subtypes
type UnitSpaceshipProbeSubtype = 'PROBE'
type UnitSpaceshipStarFighterSubtype = 'STAR_FIGHTER'
// TODO: Implement the INTERCEPTOR_STAR_FIGHTER subtype to be effective against other StarFighters and less effective against other unit types.
type UnitSpaceshipCruiserSubtype = 'CRUISER'
type UnitSpaceshipFrigateSubtype = 'FRIGATE'
type UnitSpaceshipBattleStationSubtype = 'BATTLE_STATION'

// TODO: defenses subtypes
type UnitDefenseSubtype = 'DEFENSE'

type UnitSubtypes =
  | UnitTroopInfantrySubtype
  | UnitTroopMedicSubtype
  | UnitSpaceshipProbeSubtype
  | UnitSpaceshipStarFighterSubtype
  | UnitSpaceshipCruiserSubtype
  | UnitSpaceshipFrigateSubtype
  | UnitSpaceshipBattleStationSubtype
  | UnitDefenseSubtype

export type BuildUnitsType = {
  unitId: string
  unitName: string
  unitType: UnitTypes
  amount: number
  executeTaskAt: number
  taskId: string
  energy: number
  resourceCost: number
}

export type BuildUnitsQueueType = {
  unitName: string
  amount: number
}

export type UnitType = {
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
    researches: PlayerResearchType[]
  }

  specials: SpecialType[]

  bonus: IBonus
}

export type StartBuildUnitsData = {
  unitName: string
  amount: number
  planetCoordinates: PlanetCoordinatesType

  universeName: string

  executeTaskAt?: number
}

export type updateBuildUnitsQueueData = {
  buildUnitsQueue: { unitName: string; amount: number }[]
  planetCoordinates: PlanetCoordinatesType
  unitType: UnitTypes

  universeName: string
}

export type startBuildUnitsResponseType = { task: TaskType<StartBuildUnitsTaskType> }
export type updateBuildUnitsQueueResponseType = { player: PlayerType }
