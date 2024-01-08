import mongoose, { Document, Schema } from 'mongoose'
import { BonusSchema, IBonus, IResearch } from './ResearchModel'

export const DEFAULT_FLEET_ENERGY = 100
export const DEFAULT_ALLOWED_PLANETS = 4
export const DEFAULT_TROOPS_POPULATION = 10
export const DEFAULT_RESOURCE_NAME = 'metal'
export const DEFAULT_INITIAL_RESOURCES = 1_000
export const DEFAULT_INTERGALACTIC_TRAVEL_THRESHOLD = 8

export type SpaceScoutDrone = 'spaceScoutDrone'
export type SpaceFighter = 'spaceFighter'
export type SpaceCarrier = 'spaceCarrier'
export type SpaceCruiser = 'spaceCruiser'
export type SpaceDestroyer = 'spaceDestroyer'
export type SpaceFrigate = 'spaceFrigate'
export type SpaceBattleStation = 'spaceBattleStation'
export type SpacePlanetaryBomber = 'spacePlanetaryBomber'
export type SpaceCargo = 'spaceCargo'

// TODO: move this to Units ?
export type ShipsTypes =
  | SpaceScoutDrone
  | SpaceFighter
  | SpaceCarrier
  | SpaceCruiser
  | SpaceDestroyer
  | SpaceFrigate
  | SpaceBattleStation
  | SpacePlanetaryBomber
  | SpaceCargo

type Aggressive = 'Aggressive'
type Defensive = 'Defensive'
type Explorer = 'Explorer'
type Trader = 'Trader'
type Scientist = 'Scientist'
type Stealth = 'Stealth'
type Raiders = 'Raiders'
type Colonizer = 'Colonizer'

type RaceType =
  | Aggressive
  | Defensive
  | Explorer
  | Trader
  | Scientist
  | Raiders
  | Stealth
  | Colonizer

export interface IRace {
  name: string
  description: string
  image: string
  type: RaceType[]
  maxPlanetsAllowed: number
  baseFleetEnergy: number
  baseTroopsPopulation: number
  baseResources: number // initial resources in the principal planet
  resourceName: string
  intergalacticTravelThreshold: number
  researches: IResearch[]

  // TODO: create another types for this
  // units: [] // TBD migration REMEMBER: implement Requisites!
  // specials: [] // TBD migration

  bonus: IBonus
}

const RaceSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    type: [{ type: String, required: true }],
    maxPlanetsAllowed: { type: Number, required: true, default: DEFAULT_ALLOWED_PLANETS },
    baseFleetEnergy: { type: Number, required: true, default: DEFAULT_FLEET_ENERGY },
    baseTroopsPopulation: { type: Number, required: true, default: DEFAULT_TROOPS_POPULATION },
    baseResources: { type: Number, required: true, default: DEFAULT_INITIAL_RESOURCES },
    resourceName: { type: String, required: true, default: DEFAULT_RESOURCE_NAME },
    intergalacticTravelThreshold: {
      type: Number,
      required: true,
      default: DEFAULT_INTERGALACTIC_TRAVEL_THRESHOLD
    },
    researches: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Research',
        required: true
      }
    ],
    units: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Unit',
        required: true
      }
    ],
    specials: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Special',
        required: true
      }
    ],

    bonus: { type: BonusSchema, required: true }
  },
  {
    timestamps: true
  }
)

export type IRaceDocument = IRace & Document

const RaceModel = mongoose.model<IRace>('Race', RaceSchema)

export default RaceModel
