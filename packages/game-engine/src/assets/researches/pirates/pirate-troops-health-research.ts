import { IResearch } from '../../../models/ResearchModel'

const PIRATE_TROOPS_HEALTH_RESEARCH: IResearch = {
  name: 'PIRATE_TROOPS_HEALTH_RESEARCH',
  raceName: 'pirates',
  initialTime: 20_000,
  resourceCost: 100,
  bonus: {
    troopsHealthBonus: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_TROOPS_HEALTH_RESEARCH
