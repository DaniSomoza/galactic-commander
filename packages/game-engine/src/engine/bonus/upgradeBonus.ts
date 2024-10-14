import { IBonus } from '../../types/bonus'

function upgradeBonus(bonus: IBonus, level: number): IBonus {
  const updatedBonus: IBonus = {}

  Object.keys(bonus).forEach((key) => {
    const value = bonus[key as keyof IBonus]

    if (typeof value === 'number') {
      ;(updatedBonus[key as keyof IBonus] as number) = value * level
    }
  })

  return updatedBonus
}

export default upgradeBonus
