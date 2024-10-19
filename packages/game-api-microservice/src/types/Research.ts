import { PlayerType } from './Player'
import { StartResearchTaskType, TaskType } from './Task'

export type ResearchType = {
  name: string
  description: string
  raceName: string
  // TODO: unificar objetos bonus
  bonus: BonusType
  initialTime: number
  resourceCost: number
  isTroopsPopulationResearch: boolean
  isFleetEnergyResearch: boolean
}

// TODO: CHANGE THIS TO UPPERCASE: like RESOURCE_PRODUCTION_BONUS
export type BonusType = {
  // General Bonus
  researchBonus?: number
  resourceProductionBonus?: number
  stealthFleetsMode?: boolean
  stealthFleetsDetection?: boolean
  extraPlanetsBonus?: number
  intergalacticTravelBonus?: boolean

  // Fleet Bonus
  fleetAttackBonus?: number
  fleetHullBonus?: number
  fleetHullRegenerationBonus?: number
  fleetShieldBonus?: number
  fleetShieldPiercingBonus?: boolean
  fleetShieldRegenerationBonus?: number
  fleetSpeedBonus?: number
  fleetCargoBonus?: number
  fleetBuildingBonus?: number
  maxFleetsAllowedBonus?: number

  // Troops Bonus
  troopsAttackBonus?: number
  troopsHealthBonus?: number
  troopsHealthRegenerationBonus?: number
  troopsShieldBonus?: number
  troopsShieldPiercingBonus?: boolean
  troopsShieldRegenerationBonus?: number
  troopsTrainingBonus?: number

  // Defenses Bonus
  defensesAttackBonus?: number
  defensesHullBonus?: number
  defensesShieldBonus?: number
  defensesShieldRegenerationBonus?: number
  defensesBuildingBonus?: number

  // Capture Units Bonus
  fleetCaptureBonus?: number
  spaceFighterCaptureBonus?: number
  spaceCarrierCaptureBonus?: number
  spaceCruiserCaptureBonus?: number
  spaceDestroyerCaptureBonus?: number
  spaceCargoCaptureBonus?: number
  spaceFrigateCaptureBonus?: number
  spacePlanetaryBomberCaptureBonus?: number
  spaceBattleStationCaptureBonus?: number
}

export type StartResearchData = {
  researchName: string
  universeName: string

  executeTaskAt?: number
}

export type updateResearchQueueData = {
  researchQueue: string[]
  universeName: string
}

export type startResearchResponseType = { task: TaskType<StartResearchTaskType> }
export type updateResearchQueueResponseType = { player: PlayerType }
