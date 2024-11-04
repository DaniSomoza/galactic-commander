import { BonusType, ResearchType } from './Research'

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

export type RaceType = {
  name: string
  description: string
  imgUrl: string
  tags: RaceTags[]
  maxPlanetsAllowed: number
  baseFleetEnergy: number
  baseTroopsPopulation: number
  baseResources: number
  resourceName: string
  intergalacticTravelThreshold: number
  researches: ResearchType[]
  bonus: BonusType
}
