import { IResearch } from '../../../models/ResearchModel'

const PIRATE_MINING_RESEARCH: IResearch = {
  name: 'PIRATE_MINING_RESEARCH',
  raceName: 'pirates',
  initialTime: 20_000,
  resourceCost: 150,
  bonus: {
    resourceProductionBonus: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_MINING_RESEARCH
