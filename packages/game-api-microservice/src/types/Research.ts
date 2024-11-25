import { IBonus } from 'game-engine/dist/types/IBonus'

import { PlayerType } from './Player'
import { StartResearchTaskType, TaskType } from './Task'

export type ResearchType = {
  name: string
  description: string
  raceName: string
  bonus: IBonus
  initialTime: number
  resourceCost: number
  isTroopsPopulationResearch: boolean
  isFleetEnergyResearch: boolean
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
