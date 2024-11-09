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

export const BASE_PERCENTAGE_BONUS = 100
export const BASE_NUMERIC_BONUS = 0
export const BASE_ACTIVATABLE_BONUS = false

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const percentageBonusType = {
  RESEARCH_BONUS: 'PERCENTAGE_BONUS_TYPE',
  resourceProductionBonus: 'PERCENTAGE_BONUS_TYPE',
  fleetAttackBonus: 'PERCENTAGE_BONUS_TYPE',
  fleetShieldBonus: 'PERCENTAGE_BONUS_TYPE',
  fleetSpeedBonus: 'PERCENTAGE_BONUS_TYPE',
  fleetCargoBonus: 'PERCENTAGE_BONUS_TYPE',
  fleetBuildingBonus: 'PERCENTAGE_BONUS_TYPE',
  troopsAttackBonus: 'PERCENTAGE_BONUS_TYPE',
  troopsShieldBonus: 'PERCENTAGE_BONUS_TYPE',
  troopsTrainingBonus: 'PERCENTAGE_BONUS_TYPE',
  defensesAttackBonus: 'PERCENTAGE_BONUS_TYPE',
  defensesShieldBonus: 'PERCENTAGE_BONUS_TYPE',
  defensesBuildingBonus: 'PERCENTAGE_BONUS_TYPE',
  fleetCaptureBonus: 'PERCENTAGE_BONUS_TYPE',
  spaceFighterCaptureBonus: 'PERCENTAGE_BONUS_TYPE',
  spaceCarrierCaptureBonus: 'PERCENTAGE_BONUS_TYPE',
  spaceCruiserCaptureBonus: 'PERCENTAGE_BONUS_TYPE',
  spaceDestroyerCaptureBonus: 'PERCENTAGE_BONUS_TYPE',
  spaceCargoCaptureBonus: 'PERCENTAGE_BONUS_TYPE',
  spaceFrigateCaptureBonus: 'PERCENTAGE_BONUS_TYPE',
  spacePlanetaryBomberCaptureBonus: 'PERCENTAGE_BONUS_TYPE',
  spaceBattleStationCaptureBonus: 'PERCENTAGE_BONUS_TYPE',
  fleetHullBonus: 'PERCENTAGE_BONUS_TYPE',
  fleetHullRegenerationBonus: 'PERCENTAGE_BONUS_TYPE',
  fleetShieldRegenerationBonus: 'PERCENTAGE_BONUS_TYPE',
  troopsHealthBonus: 'PERCENTAGE_BONUS_TYPE',
  troopsHealthRegenerationBonus: 'PERCENTAGE_BONUS_TYPE',
  troopsShieldRegenerationBonus: 'PERCENTAGE_BONUS_TYPE',
  defensesHullBonus: 'PERCENTAGE_BONUS_TYPE',
  defensesShieldRegenerationBonus: 'PERCENTAGE_BONUS_TYPE'
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const numericBonusType = {
  extraPlanetsBonus: 'NUMERIC_BONUS_TYPE',
  maxFleetsAllowedBonus: 'NUMERIC_BONUS_TYPE'
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const activatableBonusType = {
  stealthFleetsMode: 'ACTIVATABLE_BONUS_TYPE',
  stealthFleetsDetection: 'ACTIVATABLE_BONUS_TYPE',
  intergalacticTravelBonus: 'ACTIVATABLE_BONUS_TYPE',
  fleetShieldPiercingBonus: 'ACTIVATABLE_BONUS_TYPE',
  troopsShieldPiercingBonus: 'ACTIVATABLE_BONUS_TYPE',
  defensesShieldPiercingBonus: 'ACTIVATABLE_BONUS_TYPE'
}

const bonusTypes: Record<keyof IBonus, BonusType> = {
  RESEARCH_BONUS: 'PERCENTAGE_BONUS_TYPE',
  resourceProductionBonus: 'PERCENTAGE_BONUS_TYPE',
  stealthFleetsMode: 'ACTIVATABLE_BONUS_TYPE',
  stealthFleetsDetection: 'ACTIVATABLE_BONUS_TYPE',
  extraPlanetsBonus: 'NUMERIC_BONUS_TYPE',
  intergalacticTravelBonus: 'ACTIVATABLE_BONUS_TYPE',

  // Fleet Bonus
  fleetAttackBonus: 'PERCENTAGE_BONUS_TYPE',
  fleetHullBonus: 'PERCENTAGE_BONUS_TYPE',
  fleetHullRegenerationBonus: 'PERCENTAGE_BONUS_TYPE',
  fleetShieldBonus: 'PERCENTAGE_BONUS_TYPE',
  fleetShieldPiercingBonus: 'ACTIVATABLE_BONUS_TYPE',
  fleetShieldRegenerationBonus: 'PERCENTAGE_BONUS_TYPE',
  fleetSpeedBonus: 'PERCENTAGE_BONUS_TYPE',
  fleetCargoBonus: 'PERCENTAGE_BONUS_TYPE',
  fleetBuildingBonus: 'PERCENTAGE_BONUS_TYPE',
  maxFleetsAllowedBonus: 'NUMERIC_BONUS_TYPE',

  // Troops Bonus
  troopsAttackBonus: 'PERCENTAGE_BONUS_TYPE',
  troopsHealthBonus: 'PERCENTAGE_BONUS_TYPE',
  troopsHealthRegenerationBonus: 'PERCENTAGE_BONUS_TYPE',
  troopsShieldBonus: 'PERCENTAGE_BONUS_TYPE',
  troopsShieldPiercingBonus: 'ACTIVATABLE_BONUS_TYPE',
  troopsShieldRegenerationBonus: 'PERCENTAGE_BONUS_TYPE',
  troopsTrainingBonus: 'PERCENTAGE_BONUS_TYPE',

  // Defenses Bonus
  defensesAttackBonus: 'PERCENTAGE_BONUS_TYPE',
  defensesHullBonus: 'PERCENTAGE_BONUS_TYPE',
  defensesShieldBonus: 'PERCENTAGE_BONUS_TYPE',
  defensesShieldPiercingBonus: 'ACTIVATABLE_BONUS_TYPE',
  defensesShieldRegenerationBonus: 'PERCENTAGE_BONUS_TYPE',
  defensesBuildingBonus: 'PERCENTAGE_BONUS_TYPE',

  // Capture Units Bonus
  fleetCaptureBonus: 'PERCENTAGE_BONUS_TYPE',
  spaceFighterCaptureBonus: 'PERCENTAGE_BONUS_TYPE',
  spaceCarrierCaptureBonus: 'PERCENTAGE_BONUS_TYPE',
  spaceCruiserCaptureBonus: 'PERCENTAGE_BONUS_TYPE',
  spaceDestroyerCaptureBonus: 'PERCENTAGE_BONUS_TYPE',
  spaceCargoCaptureBonus: 'PERCENTAGE_BONUS_TYPE',
  spaceFrigateCaptureBonus: 'PERCENTAGE_BONUS_TYPE',
  spacePlanetaryBomberCaptureBonus: 'PERCENTAGE_BONUS_TYPE',
  spaceBattleStationCaptureBonus: 'PERCENTAGE_BONUS_TYPE'
}
