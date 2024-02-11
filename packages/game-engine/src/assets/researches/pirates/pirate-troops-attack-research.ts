import { IResearch } from '../../../models/ResearchModel'

const PIRATE_TROOPS_ATTACK_RESEARCH: IResearch = {
  name: 'PIRATE_TROOPS_ATTACK_RESEARCH',
  initialTime: 25_000,
  raceName: 'pirates',
  resourceCost: 200,
  bonus: {
    troopsAttackBonus: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_TROOPS_ATTACK_RESEARCH
