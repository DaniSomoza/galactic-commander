import { IResearch } from '../../../models/ResearchModel'

const PIRATE_COMPUTING_RESEARCH: IResearch = {
  name: 'PIRATE_COMPUTING_RESEARCH_NAME',
  description: 'PIRATE_COMPUTING_RESEARCH_DESCRIPTION',
  imgUrl: '/researches/pirate_computing_research.jpg',
  raceName: 'PIRATES_RACE_NAME',
  bonus: {
    maxFleetsAllowedBonus: 1
  },
  resourceCost: 100,
  initialTime: 20_000,
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_COMPUTING_RESEARCH
