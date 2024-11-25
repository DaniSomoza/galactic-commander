import { IBonus } from './IBonus'
import { IResearch } from './IResearch'
import { ISpecial } from './ISpecial'
import { IUnit } from './IUnit'

type Aggressive = 'Aggressive'
type Defensive = 'Defensive'
type Explorer = 'Explorer'
type Trader = 'Trader'
type Scientist = 'Scientist'
type Stealth = 'Stealth'
type Raiders = 'Raiders'
type Colonizer = 'Colonizer'

export type RaceTags =
  | Aggressive
  | Defensive
  | Explorer
  | Trader
  | Scientist
  | Raiders
  | Stealth
  | Colonizer

export const DEFAULT_FLEET_ENERGY = 100
export const DEFAULT_ALLOWED_PLANETS = 4
export const DEFAULT_TROOPS_POPULATION = 10
export const DEFAULT_RESOURCE_NAME = 'metal'
export const DEFAULT_INITIAL_RESOURCES = 10_000
export const DEFAULT_INTERGALACTIC_TRAVEL_THRESHOLD = 8

export interface IRace {
  name: string
  description: string
  tags: RaceTags[]

  maxPlanetsAllowed: number
  baseFleetEnergy: number
  baseTroopsPopulation: number
  baseResources: number // initial resources in the principal planet
  resourceName: string
  intergalacticTravelThreshold: number

  researches: IResearch[]

  units: IUnit[]

  specials: ISpecial[]

  bonus: IBonus
}
