import { IBonus } from '../../types/IBonus'

function upgradeBonus(bonus: IBonus, amount: number): IBonus {
  const updatedBonus: IBonus = {}

  Object.keys(bonus).forEach((key) => {
    const bono = key as keyof IBonus
    const value = bonus[bono]

    if (typeof value === 'number') {
      ;(updatedBonus[bono] as number) = value * amount
    }
  })

  return updatedBonus
}

export default upgradeBonus
