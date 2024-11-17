import { IResearch } from '../../../models/ResearchModel'

const PIRATE_FLEET_HULL_RESEARCH: IResearch = {
  name: 'PIRATE_FLEET_HULL_RESEARCH_NAME',
  description: 'PIRATE_FLEET_HULL_RESEARCH_DESCRIPTION',
  imgUrl: '/researches/pirates/pirate_fleet_hull_research.jpg',
  raceName: 'PIRATES_RACE_NAME',
  initialTime: 15_000,
  resourceCost: 150,
  bonus: {
    FLEET_HULL_BONUS: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_FLEET_HULL_RESEARCH
