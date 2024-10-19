import { IBonus } from '../types/bonus'

export const BASE_BONUS = 100

// TODO: move this to /bonus
function applyBonus(
  playerBonus: { bonus: IBonus }[],
  bonusName: keyof IBonus,
  isNumericBonus: true
): number
function applyBonus(
  playerBonus: { bonus: IBonus }[],
  bonusName: keyof IBonus,
  isNumericBonus: false
): boolean
function applyBonus(
  playerBonus: { bonus: IBonus }[],
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
