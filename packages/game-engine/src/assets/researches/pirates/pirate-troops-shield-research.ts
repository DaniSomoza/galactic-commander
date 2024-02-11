import { IResearch } from '../../../models/ResearchModel'

const PIRATE_TROOPS_SHIELD_RESEARCH: IResearch = {
  name: 'PIRATE_TROOPS_SHIELD_RESEARCH',
  raceName: 'pirates',
  initialTime: 20_000,
  resourceCost: 150,
  bonus: {
    troopsShieldBonus: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_TROOPS_SHIELD_RESEARCH
