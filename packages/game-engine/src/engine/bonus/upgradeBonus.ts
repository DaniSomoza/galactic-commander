import { Document } from 'mongoose'

import { IBonus } from '../../models/ResearchModel'

function upgradeBonus(bonus: IBonus, level: number): IBonus {
  const updatedBonus: Partial<IBonus> = {}

  // TODO: improve this
  Object.keys((bonus as Document)?.toObject()).forEach((key) => {
    const value = bonus[key as keyof IBonus]

    if (typeof value === 'number') {
      ;(updatedBonus[key as keyof IBonus] as number) = value * level
    }
  })

  return updatedBonus
}

export default upgradeBonus
