import { IResearch } from '../../../models/ResearchModel'

const PIRATE_MINING_RESEARCH: IResearch = {
  name: 'PIRATE_MINING_RESEARCH_NAME',
  description: 'PIRATE_MINING_RESEARCH_DESCRIPTION',
  imgUrl: '/researches/pirate_mining_research.jpg',
  raceName: 'PIRATES_RACE_NAME',
  initialTime: 20_000,
  resourceCost: 150,
  bonus: {
    resourceProductionBonus: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_MINING_RESEARCH
