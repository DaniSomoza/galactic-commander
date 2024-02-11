import mongoose, { Schema, Model, Document } from 'mongoose'

export interface IResearch {
  name: string
  raceName: string
  bonus: IBonus
  // TODO: ADD A ENUM initialTime 15_000 20_000 23_000 & 25_000
  initialTime: number
  // TODO: ADD A ENUM initialTime 100 150 200 & 250
  resourceCost: number

  isTroopsPopulationResearch: boolean
  isFleetEnergyResearch: boolean
}

export interface IBonus {
  // General Bonus
  researchBonus?: number
  resourceProductionBonus?: number
  stealthFleetsMode?: boolean
  stealthFleetsDetection?: boolean
  extraPlanetsBonus?: number
  intergalacticTravelBonus?: boolean

  // Fleet Bonus
  fleetAttackBonus?: number
  fleetHullBonus?: number
  fleetHullRegenerationBonus?: number // only relevant for organic ships
  fleetShieldBonus?: number
  fleetShieldPiercingBonus?: boolean
  fleetShieldRegenerationBonus?: number
  fleetSpeedBonus?: number
  fleetCargoBonus?: number
  fleetBuildingBonus?: number
  maxFleetsAllowedBonus?: number

  // Troops Bonus
  troopsAttackBonus?: number
  troopsHealthBonus?: number
  troopsHealthRegenerationBonus?: number // medics ???
  troopsShieldBonus?: number
  troopsShieldPiercingBonus?: boolean
  troopsShieldRegenerationBonus?: number
  troopsTrainingBonus?: number

  // Defenses Bonus
  defensesAttackBonus?: number
  defensesHullBonus?: number
  defensesShieldBonus?: number
  defensesShieldRegenerationBonus?: number
  defensesBuildingBonus?: number

  // Capture Units Bonus
  fleetCaptureBonus?: number
  spaceFighterCaptureBonus?: number
  spaceCarrierCaptureBonus?: number
  spaceCruiserCaptureBonus?: number
  spaceDestroyerCaptureBonus?: number
  spaceCargoCaptureBonus?: number
  spaceFrigateCaptureBonus?: number
  spacePlanetaryBomberCaptureBonus?: number
  spaceBattleStationCaptureBonus?: number
}

export const BonusSchema = new Schema(
  {
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
  },
  { _id: false }
)

export const ResearchSchema = new Schema({
  bonus: { type: BonusSchema, required: true, _id: false },
  name: {
    type: String,
    required: true,
    unique: true
  },
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
