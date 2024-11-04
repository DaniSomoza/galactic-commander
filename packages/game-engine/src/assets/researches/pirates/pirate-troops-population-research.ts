import { IResearch } from '../../../models/ResearchModel'

const PIRATE_TROOPS_POPULATION_RESEARCH: IResearch = {
  name: 'PIRATE_TROOPS_POPULATION_RESEARCH_NAME',
  description: 'PIRATE_TROOPS_POPULATION_RESEARCH_DESCRIPTION',
  imgUrl: '/researches/pirate_troops_population_research.jpg',
  raceName: 'PIRATES_RACE_NAME',
  initialTime: 23_000,
  resourceCost: 250,
  bonus: {},
  isTroopsPopulationResearch: true,
  isFleetEnergyResearch: false
}

export default PIRATE_TROOPS_POPULATION_RESEARCH
