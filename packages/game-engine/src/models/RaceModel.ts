import mongoose, { Document, Schema } from 'mongoose'

export const DEFAULT_FLEET_ENERGY = 100
export const DEFAULT_ALLOWED_PLANETS = 4
export const DEFAULT_TROOPS_POPULATION = 10
export const DEFAULT_RESOURCE_NAME = 'metal'
export const DEFAULT_INITIAL_RESOURCES = 1000
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

// TODO: move this
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

// TODO: move this
export interface IBonus {
  // General Bonus
  researchBonus: number
  resourceProductionBonus: number
  stealthFleetsMode: boolean
  stealthFleetsDetection: boolean
  extraPlanetsBonus: number
  intergalacticTravelBonus: boolean

  // Fleet Bonus
  fleetAttackBonus: number
  fleetHullBonus: number
  fleetHullRegenerationBonus: number // only for organic ships
  fleetShieldBonus: number
  fleetShieldPiercingBonus: boolean
  fleetShieldRegenerationBonus: number
  fleetSpeedBonus: number
  fleetCargoBonus: number
  fleetBuildingBonus: number
  maxFleetsAllowedBonus: number
  fleetEnergyBonus: number

  // Troops Bonus
  troopsAttackBonus: number
  troopsHealthBonus: number
  troopsHealthRegenerationBonus: number // medics ???
  troopsShieldBonus: number
  troopsShieldPiercingBonus: boolean
  troopsShieldRegenerationBonus: number
  troopsTrainingBonus: number
  troopsPopulationBonus: number

  // Defenses Bonus
  defensesAttackBonus: number
  defensesHullBonus: number
  defensesShieldBonus: number
  defensesShieldRegenerationBonus: number
  defensesBuildingBonus: number

  // Capture Units Bonus
  fleetCaptureBonus: number
  spaceFighterCaptureBonus: number
  spaceCarrierCaptureBonus: number
  spaceCruiserCaptureBonus: number
  spaceDestroyerCaptureBonus: number
  spaceCargoCaptureBonus: number
  spaceFrigateCaptureBonus: number
  spacePlanetaryBomberCaptureBonus: number
  spaceBattleStationCaptureBonus: number
}

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
  // Race basic data
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
  // TODO: create another types for this
  // researches: [] // TBD migration
  // units: [] // TBD migration
  // specials: [] // TBD migration

  bonus: IBonus
}

// TODO: meter esto en otro fichero
export const BonusSchema = new Schema({
  // General Bonus
  researchBonus: { type: Number, required: true, default: 0 },
  resourceProductionBonus: { type: Number, required: true, default: 0 },
  stealthFleetsMode: { type: Boolean, required: true, default: false },
  stealthFleetsDetection: { type: Boolean, required: true, default: false },
  extraPlanetsBonus: { type: Number, required: true, default: 0 },
  intergalacticTravelBonus: { type: Boolean, required: true, default: false },

  // Fleet Bonus
  fleetAttackBonus: { type: Number, required: true, default: 0 },
  fleetHullBonus: { type: Number, required: true, default: 0 },
  fleetHullRegenerationBonus: { type: Number, required: true, default: 0 }, // only for organic ships
  fleetShieldBonus: { type: Number, required: true, default: 0 },
  fleetShieldPiercingBonus: { type: Boolean, required: true, default: false },
  fleetShieldRegenerationBonus: { type: Number, required: true, default: 0 },
  fleetSpeedBonus: { type: Number, required: true, default: 0 },
  fleetCargoBonus: { type: Number, required: true, default: 0 },
  fleetBuildingBonus: { type: Number, required: true, default: 0 },
  maxFleetsAllowedBonus: { type: Number, required: true, default: 0 },
  fleetEnergyBonus: { type: Number, required: true, default: 0 },

  // Troops Bonus
  troopsAttackBonus: { type: Number, required: true, default: 0 },
  troopsHealthBonus: { type: Number, required: true, default: 0 },
  troopsHealthRegenerationBonus: { type: Number, required: true, default: 0 }, // medics ???
  troopsShieldBonus: { type: Number, required: true, default: 0 },
  troopsShieldPiercingBonus: { type: Boolean, required: true, default: false },
  troopsShieldRegenerationBonus: { type: Number, required: true, default: 0 },
  troopsTrainingBonus: { type: Number, required: true, default: 0 },
  troopsPopulationBonus: { type: Number, required: true, default: 0 },

  // Defenses Bonus
  defensesAttackBonus: { type: Number, required: true, default: 0 },
  defensesHullBonus: { type: Number, required: true, default: 0 },
  defensesShieldBonus: { type: Number, required: true, default: 0 },
  defensesShieldRegenerationBonus: { type: Number, required: true, default: 0 },
  defensesBuildingBonus: { type: Number, required: true, default: 0 },

  // Capture Units Bonus
  fleetCaptureBonus: { type: Number, required: true, default: 0 },
  spaceFighterCaptureBonus: { type: Number, required: true, default: 0 },
  spaceCarrierCaptureBonus: { type: Number, required: true, default: 0 },
  spaceCruiserCaptureBonus: { type: Number, required: true, default: 0 },
  spaceDestroyerCaptureBonus: { type: Number, required: true, default: 0 },
  spaceCargoCaptureBonus: { type: Number, required: true, default: 0 },
  spaceFrigateCaptureBonus: { type: Number, required: true, default: 0 },
  spacePlanetaryBomberCaptureBonus: { type: Number, required: true, default: 0 },
  spaceBattleStationCaptureBonus: { type: Number, required: true, default: 0 }
})

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
        ref: 'Specials',
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
