import { BonusType, IBonus } from '../../types/bonus'

function computedBonus<T extends keyof typeof percentageBonusType>(
  playerBonus: { bonus: IBonus }[],
  bonusName: T
): number
function computedBonus<T extends keyof typeof numericBonusType>(
  playerBonus: { bonus: IBonus }[],
  bonusName: T
): number
function computedBonus<T extends keyof typeof activatableBonusType>(
  playerBonus: { bonus: IBonus }[],
  bonusName: T
): boolean
function computedBonus<T extends keyof typeof bonusTypes>(
  playerBonus: { bonus: IBonus }[],
  bonusName: T
): number | boolean {
  const BonusType = bonusTypes[bonusName]

  const isNumericBonus = BonusType === 'PERCENTAGE_BONUS_TYPE' || BonusType === 'NUMERIC_BONUS_TYPE'

  if (isNumericBonus) {
    return playerBonus.reduce(
      (computedBonus, playerBonus) => {
        const bonus = playerBonus.bonus[bonusName] || 0
        return computedBonus + (bonus as number)
      },
      BonusType === 'PERCENTAGE_BONUS_TYPE' ? BASE_PERCENTAGE_BONUS : BASE_NUMERIC_BONUS
    ) as number
  }

  return playerBonus.some((playerBonus) => playerBonus.bonus[bonusName] === true) as boolean
}

export default computedBonus

// TODO: MOVE THIS TO bonus.ts

export const BASE_PERCENTAGE_BONUS = 100
export const BASE_NUMERIC_BONUS = 0
export const BASE_ACTIVATABLE_BONUS = false

export const bonusTypes: Record<keyof IBonus, BonusType> = {
  RESEARCH_BONUS: 'PERCENTAGE_BONUS_TYPE',
  RESOURCE_PRODUCTION_BONUS: 'PERCENTAGE_BONUS_TYPE',
  STEALTH_FLEETS_BONUS: 'ACTIVATABLE_BONUS_TYPE',
  STEALTH_FLEETS_DETECTION_BONUS: 'ACTIVATABLE_BONUS_TYPE',
  EXTRA_PLANETS_BONUS: 'NUMERIC_BONUS_TYPE',
  MAX_FLEETS_ALLOWED_BONUS: 'NUMERIC_BONUS_TYPE',
  INTERGALACTIC_TRAVEL_BONUS: 'ACTIVATABLE_BONUS_TYPE',

  // Capture Units Bonus
  FLEET_CAPTURE_BONUS: 'PERCENTAGE_BONUS_TYPE',

  // Fleet Bonus
  FLEET_ATTACK_BONUS: 'PERCENTAGE_BONUS_TYPE',
  FLEET_HULL_BONUS: 'PERCENTAGE_BONUS_TYPE',
  FLEET_SHIELD_BONUS: 'PERCENTAGE_BONUS_TYPE',
  FLEET_SPEED_BONUS: 'PERCENTAGE_BONUS_TYPE',
  FLEET_CARGO_BONUS: 'PERCENTAGE_BONUS_TYPE',
  FLEET_BUILDING_BONUS: 'PERCENTAGE_BONUS_TYPE',
  FLEET_ENERGY_BONUS: 'PERCENTAGE_BONUS_TYPE',
  FLEET_SHIELD_REGENERATION_BONUS: 'PERCENTAGE_BONUS_TYPE',
  FLEET_SHIELD_PIERCING_BONUS: 'ACTIVATABLE_BONUS_TYPE',
  FLEET_HULL_REGENERATION_BONUS: 'PERCENTAGE_BONUS_TYPE',

  // Troops Bonus
  TROOPS_ATTACK_BONUS: 'PERCENTAGE_BONUS_TYPE',
  TROOPS_HEALTH_BONUS: 'PERCENTAGE_BONUS_TYPE',
  TROOPS_SHIELD_BONUS: 'PERCENTAGE_BONUS_TYPE',
  TROOPS_TRAINING_BONUS: 'PERCENTAGE_BONUS_TYPE',
  TROOPS_POPULATION_BONUS: 'PERCENTAGE_BONUS_TYPE',
  TROOPS_HEALTH_REGENERATION_BONUS: 'PERCENTAGE_BONUS_TYPE',
  TROOPS_SHIELD_PIERCING_BONUS: 'ACTIVATABLE_BONUS_TYPE',
  TROOPS_SHIELD_REGENERATION_BONUS: 'PERCENTAGE_BONUS_TYPE',

  // Defenses Bonus
  DEFENSES_ATTACK_BONUS: 'PERCENTAGE_BONUS_TYPE',
  DEFENSES_HULL_BONUS: 'PERCENTAGE_BONUS_TYPE',
  DEFENSES_SHIELD_BONUS: 'PERCENTAGE_BONUS_TYPE',
  DEFENSES_BUILDING_BONUS: 'PERCENTAGE_BONUS_TYPE',
  DEFENSES_SHIELD_PIERCING_BONUS: 'ACTIVATABLE_BONUS_TYPE',
  DEFENSES_SHIELD_REGENERATION_BONUS: 'PERCENTAGE_BONUS_TYPE'
}

export const percentageBonusType = Object.keys(bonusTypes).reduce<
  Record<keyof IBonus, 'PERCENTAGE_BONUS_TYPE'>
>(
  (percentageBonusType, bonus) => {
    const bonusType: BonusType = bonusTypes[bonus as keyof IBonus]

    if (bonusType === 'PERCENTAGE_BONUS_TYPE') {
      percentageBonusType[bonus as keyof IBonus] = bonusType
    }

    return percentageBonusType
  },
  {} as Record<keyof IBonus, 'PERCENTAGE_BONUS_TYPE'>
)

export const numericBonusType = Object.keys(bonusTypes).reduce<
  Record<keyof IBonus, 'NUMERIC_BONUS_TYPE'>
>(
  (numericBonusType, bonus) => {
    const bonusType: BonusType = bonusTypes[bonus as keyof IBonus]

    if (bonusType === 'NUMERIC_BONUS_TYPE') {
      numericBonusType[bonus as keyof IBonus] = bonusType
    }

    return numericBonusType
  },
  {} as Record<keyof IBonus, 'NUMERIC_BONUS_TYPE'>
)

export const activatableBonusType = Object.keys(bonusTypes).reduce<
  Record<keyof IBonus, 'ACTIVATABLE_BONUS_TYPE'>
>(
  (activatableBonusType, bonus) => {
    const bonusType: BonusType = bonusTypes[bonus as keyof IBonus]

    if (bonusType === 'ACTIVATABLE_BONUS_TYPE') {
      activatableBonusType[bonus as keyof IBonus] = bonusType
    }

    return activatableBonusType
  },
  {} as Record<keyof IBonus, 'ACTIVATABLE_BONUS_TYPE'>
)
