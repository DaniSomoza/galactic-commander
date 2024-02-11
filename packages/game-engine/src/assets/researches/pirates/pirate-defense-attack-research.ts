import { IResearch } from '../../../models/ResearchModel'

const PIRATE_DEFENSE_ATTACK_RESEARCH: IResearch = {
  name: 'PIRATE_DEFENSE_ATTACK_RESEARCH',
  raceName: 'pirates',
  resourceCost: 100,
  initialTime: 20_000,
  bonus: {
    defensesAttackBonus: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_DEFENSE_ATTACK_RESEARCH
