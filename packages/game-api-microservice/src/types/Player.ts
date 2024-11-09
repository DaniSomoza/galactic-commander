import { PlanetType } from './Planet'
import { RaceType } from './Race'
import { BonusType, ResearchType } from './Research'
import { NewPlayerTaskType, TaskType } from './Task'
import { UniverseType } from './Universe'

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
    explored: string[]
  }
  // TODO: unificar objetos bonus
  bonus: {
    bonus: BonusType
    source: string
    type: 'Planet' | 'Special' | 'Unit' | 'Research' | 'Race'
  }[]
  // TODO: CREATE A NEW COLLECTION FOR THIS!!!! points collection
  points: {
    points: number
    source: string
    type: 'Unit' | 'Research' | 'Battle'
    second: number
  }[]
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
