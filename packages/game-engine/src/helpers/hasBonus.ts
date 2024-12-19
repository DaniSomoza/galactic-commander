import { IBonus } from '../types/IBonus'

function hasBonus(bonus: IBonus): boolean {
  return Object.keys(bonus).some((perk) => !!bonus[perk as keyof IBonus])
}

export default hasBonus
