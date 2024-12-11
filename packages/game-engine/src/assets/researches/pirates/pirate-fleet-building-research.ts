import { IResearch } from '../../../types/IResearch'

const PIRATE_FLEET_BUILDING_RESEARCH: IResearch = {
  name: 'PIRATE_FLEET_BUILDING_RESEARCH_NAME',
  description: 'PIRATE_FLEET_BUILDING_RESEARCH_DESCRIPTION',
  raceName: 'PIRATES_RACE_NAME',
  resourceCost: 250,
  initialTime: 25_000,
  bonus: {
    FLEET_BUILDING_BONUS: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_FLEET_BUILDING_RESEARCH
