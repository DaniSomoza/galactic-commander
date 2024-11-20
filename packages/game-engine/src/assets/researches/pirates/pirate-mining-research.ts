import { IResearch } from '../../../models/ResearchModel'

const PIRATE_MINING_RESEARCH: IResearch = {
  name: 'PIRATE_MINING_RESEARCH_NAME',
  description: 'PIRATE_MINING_RESEARCH_DESCRIPTION',
  raceName: 'PIRATES_RACE_NAME',
  initialTime: 20_000,
  resourceCost: 150,
  bonus: {
    RESOURCE_PRODUCTION_BONUS: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_MINING_RESEARCH
