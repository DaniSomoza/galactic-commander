import mongoose, { Schema, Model, Document } from 'mongoose'

import { IBonus } from '../types/bonus'

export interface IResearch {
  name: string
  description: string
  imgUrl: string
  raceName: string
  bonus: IBonus
  initialTime: number
  resourceCost: number

  isTroopsPopulationResearch: boolean
  isFleetEnergyResearch: boolean
}

export const BonusType = {
  // General Bonus
  RESEARCH_BONUS: { type: Number, required: false },
  RESOURCE_PRODUCTION_BONUS: { type: Number, required: false },
  STEALTH_FLEETS_BONUS: { type: Boolean, required: false },
  STEALTH_FLEETS_DETECTION_BONUS: { type: Boolean, required: false },
  EXTRA_PLANETS_BONUS: { type: Number, required: false },
  INTERGALACTIC_TRAVEL_BONUS: { type: Boolean, required: false },

  // Fleet Bonus
  FLEET_ATTACK_BONUS: { type: Number, required: false },
  FLEET_HULL_BONUS: { type: Number, required: false },
  FLEET_HULL_REGENERATION_BONUS: { type: Number, required: false }, // only for organic ships
  FLEET_SHIELD_BONUS: { type: Number, required: false },
  FLEET_SHIELD_PIERCING_BONUS: { type: Boolean, required: false },
  FLEET_SHIELD_REGENERATION_BONUS: { type: Number, required: false },
  FLEET_SPEED_BONUS: { type: Number, required: false },
  FLEET_CARGO_BONUS: { type: Number, required: false },
  FLEET_BUILDING_BONUS: { type: Number, required: false },
  MAX_FLEETS_ALLOWED_BONUS: { type: Number, required: false },

  // Troops Bonus
  TROOPS_ATTACK_BONUS: { type: Number, required: false },
  TROOPS_HEALTH_BONUS: { type: Number, required: false },
  TROOPS_HEALTH_REGENERATION_BONUS: { type: Number, required: false }, // medics ???
  TROOPS_SHIELD_BONUS: { type: Number, required: false },
  TROOPS_SHIELD_PIERCING_BONUS: { type: Boolean, required: false },
  TROOPS_SHIELD_REGENERATION_BONUS: { type: Number, required: false },
  TROOPS_TRAINING_BONUS: { type: Number, required: false },

  // Defenses Bonus
  DEFENSES_ATTACK_BONUS: { type: Number, required: false },
  DEFENSES_HULL_BONUS: { type: Number, required: false },
  DEFENSES_SHIELD_BONUS: { type: Number, required: false },
  DEFENSES_SHIELD_PIERCING_BONUS: { type: Boolean, required: false },
  DEFENSES_SHIELD_REGENERATION_BONUS: { type: Number, required: false },
  DEFENSES_BUILDING_BONUS: { type: Number, required: false },

  // Capture Units Bonus
  FLEET_CAPTURE_BONUS: { type: Number, required: false },
  FLEET_STARFIGHTER_CAPTURE_BONUS: { type: Number, required: false },
  FLEET_SPACE_CARRIER_CAPTURE_BONUS: { type: Number, required: false },
  FLEET_SPACE_CRUISER_CAPTURE_BONUS: { type: Number, required: false },
  FLEET_DESTROYER_CAPTURE_BONUS: { type: Number, required: false },
  FLEET_SPACE_CARGO_CAPTURE_BONUS: { type: Number, required: false },
  FLEET_FRIGATE_CAPTURE_BONUS: { type: Number, required: false },
  FLEET_BOMBER_CAPTURE_BONUS: { type: Number, required: false },
  FLEET_SPACE_BATTLE_STATION_CAPTURE_BONUS: { type: Number, required: false }
}

export const ResearchSchema = new Schema({
  bonus: BonusType,
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: { type: String, required: true },
  imgUrl: { type: String, required: true },

  raceName: { type: String, required: true },

  initialTime: { type: Number, required: true },
  resourceCost: { type: Number, required: true },

  isTroopsPopulationResearch: { type: Boolean, required: true, default: false },
  isFleetEnergyResearch: { type: Boolean, required: true, default: false }
})

export interface IResearchDocument extends IResearch, Document {}

const ResearchModel: Model<IResearchDocument> = mongoose.model<IResearchDocument>(
  'Research',
  ResearchSchema
)

export default ResearchModel
