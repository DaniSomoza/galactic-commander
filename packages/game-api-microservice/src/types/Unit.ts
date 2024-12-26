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
