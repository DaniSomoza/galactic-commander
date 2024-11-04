import { IResearch } from '../../../models/ResearchModel'

const PIRATE_FLEET_BUILDING_RESEARCH: IResearch = {
  name: 'PIRATE_FLEET_BUILDING_RESEARCH_NAME',
  description: 'PIRATE_FLEET_BUILDING_RESEARCH_DESCRIPTION',
  imgUrl: '/researches/pirate_fleet_building_research.jpg',
  raceName: 'PIRATES_RACE_NAME',
  resourceCost: 250,
  initialTime: 25_000,
  bonus: {
    fleetBuildingBonus: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_FLEET_BUILDING_RESEARCH
