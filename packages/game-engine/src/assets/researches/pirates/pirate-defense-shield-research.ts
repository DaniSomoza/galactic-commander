import { IResearch } from '../../../models/ResearchModel'

const PIRATE_DEFENSE_SHIELD_RESEARCH: IResearch = {
  name: 'PIRATE_DEFENSE_SHIELD_RESEARCH',
  initialTime: 15_000,
  resourceCost: 150,
  raceName: 'pirates',
  bonus: {
    defensesShieldBonus: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_DEFENSE_SHIELD_RESEARCH
