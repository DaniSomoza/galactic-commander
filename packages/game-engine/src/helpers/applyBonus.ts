import { IPlayerBonus } from '../models/PlayerModel'
import { IBonus } from '../models/ResearchModel'

export const BASE_BONUS = 100

function applyBonus(
  playerBonus: IPlayerBonus[],
  bonusName: keyof IBonus,
  isNumericBonus: true
): number
function applyBonus(
  playerBonus: IPlayerBonus[],
  bonusName: keyof IBonus,
  isNumericBonus: false
): boolean
function applyBonus(
  playerBonus: IPlayerBonus[],
  bonusName: keyof IBonus,
  isNumericBonus: boolean
): number | boolean {
  if (isNumericBonus) {
    return playerBonus.reduce((computedBonus, playerBonus) => {
      const bonus = playerBonus.bonus[bonusName] || 0

      return computedBonus + (bonus as number)
    }, BASE_BONUS)
  }

  return playerBonus.some((playerBonus) => playerBonus.bonus[bonusName] === true)
}

export default applyBonus
