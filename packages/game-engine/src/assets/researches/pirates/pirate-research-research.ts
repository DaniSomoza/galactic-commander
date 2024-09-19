import { IResearch } from '../../../models/ResearchModel'

const PIRATE_RESEARCH_RESEARCH: IResearch = {
  name: 'PIRATE_RESEARCH_RESEARCH',
  raceName: 'pirates',
  initialTime: 23_000,
  resourceCost: 200,
  bonus: {
    researchBonus: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_RESEARCH_RESEARCH
