import { IBonus } from '../../types/IBonus'

function upgradeResearchBonus(bonus: IBonus, level: number): IBonus {
  const updatedBonus: IBonus = {}

  Object.keys(bonus).forEach((key) => {
    const bono = key as keyof IBonus
    const value = bonus[bono]

    if (typeof value === 'number') {
      ;(updatedBonus[bono] as number) = value * level
    }
  })

  return updatedBonus
}

export default upgradeResearchBonus
