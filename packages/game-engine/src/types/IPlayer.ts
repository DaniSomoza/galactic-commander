import { IBonus } from './IBonus'
import { IPlanet } from './IPlanet'
import { IResearch } from './IResearch'
import { IRace } from './IRace'
import { IFleet } from './IFleet'

interface IPlayerUser {
  username: string
  email: string
}

interface IPlayerPlanets {
  principal: IPlanet
  colonies: IPlanet[]
}

interface IPlayerPerk {
  bonus: IBonus
  sourceId: string
  sourceName: string
  type: 'Planet' | 'Special' | 'Unit' | 'Research' | 'Race'
}

export interface IPlayerResearch {
  research: IResearch
  level: number
}

interface IPlayerActiveResearch {
  research: IResearch
  level: number
  executeTaskAt: number
  taskId: string
}

interface IPlayerResearches {
  researched: IPlayerResearch[]
  activeResearch?: IPlayerActiveResearch
  queue: string[]
}

export interface IPlayer {
  user: IPlayerUser
  race: IRace
  universeId: string
  planets: IPlayerPlanets
  perks: IPlayerPerk[]
  researches: IPlayerResearches
  fleets: IFleet[]
}
