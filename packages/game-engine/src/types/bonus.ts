type PercentageBonus = number
type NumericBonus = number
type ActivatableBonus = boolean

export type BonusType = 'PERCENTAGE_BONUS_TYPE' | 'NUMERIC_BONUS_TYPE' | 'ACTIVATABLE_BONUS_TYPE'

export type IBonus = {
  // General Bonus
  RESEARCH_BONUS?: PercentageBonus
  RESOURCE_PRODUCTION_BONUS?: PercentageBonus
  STEALTH_FLEETS_BONUS?: ActivatableBonus
  STEALTH_FLEETS_DETECTION_BONUS?: ActivatableBonus
  EXTRA_PLANETS_BONUS?: NumericBonus
  INTERGALACTIC_TRAVEL_BONUS?: ActivatableBonus

  // Fleet Bonus
  FLEET_ATTACK_BONUS?: PercentageBonus
  FLEET_HULL_BONUS?: PercentageBonus
  FLEET_HULL_REGENERATION_BONUS?: PercentageBonus // only relevant for organic ships
  FLEET_SHIELD_BONUS?: PercentageBonus
  FLEET_SHIELD_PIERCING_BONUS?: ActivatableBonus
  FLEET_SHIELD_REGENERATION_BONUS?: PercentageBonus
  FLEET_SPEED_BONUS?: PercentageBonus
  FLEET_CARGO_BONUS?: PercentageBonus
  FLEET_BUILDING_BONUS?: PercentageBonus
  MAX_FLEETS_ALLOWED_BONUS?: NumericBonus
  FLEET_ENERGY_BONUS?: PercentageBonus

  // Troops Bonus
  TROOPS_ATTACK_BONUS?: PercentageBonus
  TROOPS_HEALTH_BONUS?: PercentageBonus
  TROOPS_HEALTH_REGENERATION_BONUS?: PercentageBonus
  TROOPS_SHIELD_BONUS?: PercentageBonus
  TROOPS_SHIELD_PIERCING_BONUS?: ActivatableBonus
  TROOPS_SHIELD_REGENERATION_BONUS?: PercentageBonus
  TROOPS_TRAINING_BONUS?: PercentageBonus
  TROOPS_POPULATION_BONUS?: PercentageBonus

  // Defenses Bonus
  DEFENSES_ATTACK_BONUS?: PercentageBonus
  DEFENSES_HULL_BONUS?: PercentageBonus
  DEFENSES_SHIELD_BONUS?: PercentageBonus
  DEFENSES_SHIELD_PIERCING_BONUS?: ActivatableBonus
  DEFENSES_SHIELD_REGENERATION_BONUS?: PercentageBonus
  DEFENSES_BUILDING_BONUS?: PercentageBonus

  // Capture Units Bonus
  FLEET_CAPTURE_BONUS?: PercentageBonus
}
