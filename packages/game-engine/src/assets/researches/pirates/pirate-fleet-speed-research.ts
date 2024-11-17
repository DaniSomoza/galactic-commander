import { IResearch } from '../../../models/ResearchModel'

const PIRATE_FLEET_SPEED_RESEARCH: IResearch = {
  name: 'PIRATE_FLEET_SPEED_RESEARCH_NAME',
  description: 'PIRATE_FLEET_SPEED_RESEARCH_DESCRIPTION',
  imgUrl: '/researches/pirates/pirate_fleet_speed_research.jpg',
  raceName: 'PIRATES_RACE_NAME',
  initialTime: 25_000,
  resourceCost: 200,
  bonus: {
    FLEET_SPEED_BONUS: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_FLEET_SPEED_RESEARCH
