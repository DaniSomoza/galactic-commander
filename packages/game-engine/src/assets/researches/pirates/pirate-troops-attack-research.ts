import { IResearch } from '../../../models/ResearchModel'

const PIRATE_TROOPS_ATTACK_RESEARCH: IResearch = {
  name: 'PIRATE_TROOPS_ATTACK_RESEARCH_NAME',
  description: 'PIRATE_TROOPS_ATTACK_RESEARCH_DESCRIPTION',
  raceName: 'PIRATES_RACE_NAME',
  initialTime: 25_000,
  resourceCost: 200,
  bonus: {
    troopsAttackBonus: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_TROOPS_ATTACK_RESEARCH
