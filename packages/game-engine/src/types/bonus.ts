export type IBonus = {
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
