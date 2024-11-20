import mongoose, { Document, Schema, Model } from 'mongoose'

import { BonusType, IResearchDocument } from './ResearchModel'
import { IBonus } from '../types/bonus'

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
  researches: IResearchDocument[]

  // TODO: create another types for this
  // units: [] // TBD migration REMEMBER: implement Requisites!
  // specials: [] // TBD migration

  bonus: IBonus
}

const RaceSchema: Schema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    tags: [{ type: String, required: true }],
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

    bonus: BonusType
  },
  {
    timestamps: true
  }
)

export interface IRaceDocument extends IRace, Document {}

const RaceModel: Model<IRaceDocument> = mongoose.model<IRaceDocument>('Race', RaceSchema)

export default RaceModel
