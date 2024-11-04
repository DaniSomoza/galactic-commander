import mongoose, { Schema, Model, Document } from 'mongoose'

import { IBonus } from '../types/bonus'

export interface IResearch {
  name: string
  description: string
  imgUrl: string
  raceName: string
  bonus: IBonus
  // TODO: ADD A ENUM initialTime 15_000 20_000 23_000 & 25_000
  initialTime: number
  // TODO: ADD A ENUM initialTime 100 150 200 & 250
  resourceCost: number

  isTroopsPopulationResearch: boolean
  isFleetEnergyResearch: boolean
  // TODO: number of fleets ???
}

export const BonusType = {
  // General Bonus
  researchBonus: { type: Number, required: false },
  resourceProductionBonus: { type: Number, required: false },
  stealthFleetsMode: { type: Boolean, required: false },
  stealthFleetsDetection: { type: Boolean, required: false },
  extraPlanetsBonus: { type: Number, required: false },
  intergalacticTravelBonus: { type: Boolean, required: false },

  // Fleet Bonus
  fleetAttackBonus: { type: Number, required: false },
  fleetHullBonus: { type: Number, required: false },
  fleetHullRegenerationBonus: { type: Number, required: false }, // only for organic ships
  fleetShieldBonus: { type: Number, required: false },
  fleetShieldPiercingBonus: { type: Boolean, required: false },
  fleetShieldRegenerationBonus: { type: Number, required: false },
  fleetSpeedBonus: { type: Number, required: false },
  fleetCargoBonus: { type: Number, required: false },
  fleetBuildingBonus: { type: Number, required: false },
  maxFleetsAllowedBonus: { type: Number, required: false },

  // Troops Bonus
  troopsAttackBonus: { type: Number, required: false },
  troopsHealthBonus: { type: Number, required: false },
  troopsHealthRegenerationBonus: { type: Number, required: false }, // medics ???
  troopsShieldBonus: { type: Number, required: false },
  troopsShieldPiercingBonus: { type: Boolean, required: false },
  troopsShieldRegenerationBonus: { type: Number, required: false },
  troopsTrainingBonus: { type: Number, required: false },

  // Defenses Bonus
  defensesAttackBonus: { type: Number, required: false },
  defensesHullBonus: { type: Number, required: false },
  defensesShieldBonus: { type: Number, required: false },
  defensesShieldRegenerationBonus: { type: Number, required: false },
  defensesBuildingBonus: { type: Number, required: false },

  // Capture Units Bonus
  fleetCaptureBonus: { type: Number, required: false },
  spaceFighterCaptureBonus: { type: Number, required: false },
  spaceCarrierCaptureBonus: { type: Number, required: false },
  spaceCruiserCaptureBonus: { type: Number, required: false },
  spaceDestroyerCaptureBonus: { type: Number, required: false },
  spaceCargoCaptureBonus: { type: Number, required: false },
  spaceFrigateCaptureBonus: { type: Number, required: false },
  spacePlanetaryBomberCaptureBonus: { type: Number, required: false },
  spaceBattleStationCaptureBonus: { type: Number, required: false }
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

  // TODO: add enums!
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
