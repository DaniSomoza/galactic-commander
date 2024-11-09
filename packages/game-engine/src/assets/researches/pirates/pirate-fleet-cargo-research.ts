import { IResearch } from '../../../models/ResearchModel'

const PIRATE_FLEET_CARGO_RESEARCH: IResearch = {
  name: 'PIRATE_FLEET_CARGO_RESEARCH_NAME',
  description: 'PIRATE_FLEET_CARGO_RESEARCH_DESCRIPTION',
  imgUrl: '/researches/pirate_fleet_cargo_research.jpg',
  raceName: 'PIRATES_RACE_NAME',
  initialTime: 15_000,
  resourceCost: 100,
  bonus: {
    FLEET_CARGO_BONUS: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_FLEET_CARGO_RESEARCH
