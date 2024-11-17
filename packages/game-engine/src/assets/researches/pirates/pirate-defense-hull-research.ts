import { IResearch } from '../../../models/ResearchModel'

const PIRATE_DEFENSE_HULL_RESEARCH: IResearch = {
  name: 'PIRATE_DEFENSE_HULL_RESEARCH_NAME',
  description: 'PIRATE_DEFENSE_HULL_RESEARCH_DESCRIPTION',
  imgUrl: '/researches/pirates/pirate_defense_hull_research.jpg',
  raceName: 'PIRATES_RACE_NAME',
  initialTime: 15_000,
  resourceCost: 100,
  bonus: {
    DEFENSES_HULL_BONUS: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_DEFENSE_HULL_RESEARCH
