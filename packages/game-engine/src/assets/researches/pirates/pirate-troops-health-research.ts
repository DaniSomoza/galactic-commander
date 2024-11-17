import { IResearch } from '../../../models/ResearchModel'

const PIRATE_TROOPS_HEALTH_RESEARCH: IResearch = {
  name: 'PIRATE_TROOPS_HEALTH_RESEARCH_NAME',
  description: 'PIRATE_TROOPS_HEALTH_RESEARCH_DESCRIPTION',
  imgUrl: '/researches/pirates/pirate_troops_health_research.jpg',
  raceName: 'PIRATES_RACE_NAME',
  initialTime: 20_000,
  resourceCost: 100,
  bonus: {
    TROOPS_HEALTH_BONUS: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_TROOPS_HEALTH_RESEARCH
