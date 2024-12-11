import { IBonus } from './IBonus'

export interface IResearch {
  name: string
  description: string
  raceName: string
  initialTime: number
  resourceCost: number

  isTroopsPopulationResearch: boolean
  isFleetEnergyResearch: boolean

  bonus: IBonus
}
