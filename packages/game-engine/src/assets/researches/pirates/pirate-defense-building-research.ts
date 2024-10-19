import { IResearch } from '../../../models/ResearchModel'

const PIRATE_DEFENSE_BUILDING_RESEARCH: IResearch = {
  name: 'PIRATE_DEFENSE_BUILDING_RESEARCH_NAME',
  description: 'PIRATE_DEFENSE_BUILDING_RESEARCH_DESCRIPTION',
  raceName: 'PIRATES_RACE_NAME',
  initialTime: 15_000,
  resourceCost: 100,
  bonus: {
    defensesBuildingBonus: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_DEFENSE_BUILDING_RESEARCH
