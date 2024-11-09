import { IResearch } from '../../../models/ResearchModel'

const PIRATE_RESEARCH_RESEARCH: IResearch = {
  name: 'PIRATE_RESEARCH_RESEARCH_NAME',
  description: 'PIRATE_RESEARCH_RESEARCH_DESCRIPTION',
  imgUrl: '/researches/pirate_research_research.jpg',
  raceName: 'PIRATES_RACE_NAME',
  initialTime: 23_000,
  resourceCost: 200,
  bonus: {
    RESEARCH_BONUS: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_RESEARCH_RESEARCH
