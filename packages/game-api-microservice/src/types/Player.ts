import { IBonus } from 'game-engine/dist/types/IBonus'

import { PlanetType } from './Planet'
import { RaceType } from './Race'
import { ResearchType } from './Research'
import { NewPlayerTaskType, TaskType } from './Task'
import { UniverseType } from './Universe'

export type PlayerPerkType = {
  bonus: IBonus
  sourceName: string
  type: 'Planet' | 'Special' | 'Unit' | 'Research' | 'Race'
}

export type PlayerType = {
  user: {
    username: string
    email: string
  }
  race: RaceType
  universe: UniverseType
  planets: {
    principal: PlanetType
    colonies: PlanetType[]
  }
  perks: PlayerPerkType[]
  researches: {
    researched: {
      research: ResearchType
      level: number
    }[]
    activeResearch?: {
      research: ResearchType
      level: number
      executeTaskAt: number
      taskId: string
    }
    queue: string[]
  }
  units: {
    troops: {
      population: number
    }
    fleets: {
      energy: number
    }
    defenses: {
      structures: number
    }
  }
}

export type PlayerData = {
  username: string
  email: string
  isActivated: boolean
  raceName: string
  universeName: string
}

export type createPlayerResponseType = { task: TaskType<NewPlayerTaskType> }
export type getPlayerResponseType = { player: PlayerType }
