type PercentageBonus = number
type NumericBonus = number
type ActivatableBonus = boolean

export type BonusType = 'PERCENTAGE_BONUS_TYPE' | 'NUMERIC_BONUS_TYPE' | 'ACTIVATABLE_BONUS_TYPE'

export type IBonus = {
  // General Bonus
  RESEARCH_BONUS?: PercentageBonus
  resourceProductionBonus?: PercentageBonus
  stealthFleetsMode?: ActivatableBonus
  stealthFleetsDetection?: ActivatableBonus
  extraPlanetsBonus?: NumericBonus
  intergalacticTravelBonus?: ActivatableBonus

  // Fleet Bonus
  fleetAttackBonus?: PercentageBonus
  fleetHullBonus?: PercentageBonus
  fleetHullRegenerationBonus?: PercentageBonus // only relevant for organic ships
  fleetShieldBonus?: PercentageBonus
  fleetShieldPiercingBonus?: ActivatableBonus
  fleetShieldRegenerationBonus?: PercentageBonus
  fleetSpeedBonus?: PercentageBonus
  fleetCargoBonus?: PercentageBonus
  fleetBuildingBonus?: PercentageBonus
  maxFleetsAllowedBonus?: NumericBonus

  // Troops Bonus
  troopsAttackBonus?: PercentageBonus
  troopsHealthBonus?: PercentageBonus
  troopsHealthRegenerationBonus?: PercentageBonus
  troopsShieldBonus?: PercentageBonus
  troopsShieldPiercingBonus?: ActivatableBonus
  troopsShieldRegenerationBonus?: PercentageBonus
  troopsTrainingBonus?: PercentageBonus

  // Defenses Bonus
  defensesAttackBonus?: PercentageBonus
  defensesHullBonus?: PercentageBonus
  defensesShieldBonus?: PercentageBonus
  defensesShieldPiercingBonus?: ActivatableBonus
  defensesShieldRegenerationBonus?: PercentageBonus
  defensesBuildingBonus?: PercentageBonus

  // Capture Units Bonus
  fleetCaptureBonus?: PercentageBonus
  spaceFighterCaptureBonus?: PercentageBonus
  spaceCarrierCaptureBonus?: PercentageBonus
  spaceCruiserCaptureBonus?: PercentageBonus
  spaceDestroyerCaptureBonus?: PercentageBonus
  spaceCargoCaptureBonus?: PercentageBonus
  spaceFrigateCaptureBonus?: PercentageBonus
  spacePlanetaryBomberCaptureBonus?: PercentageBonus
  spaceBattleStationCaptureBonus?: PercentageBonus
}
