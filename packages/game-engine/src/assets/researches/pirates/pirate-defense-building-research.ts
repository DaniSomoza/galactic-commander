import { IResearch } from '../../../models/ResearchModel'

const PIRATE_DEFENSE_BUILDING_RESEARCH: IResearch = {
  name: 'PIRATE_DEFENSE_BUILDING_RESEARCH',
  initialTime: 15_000,
  raceName: 'pirates',
  resourceCost: 100,
  bonus: {
    defensesBuildingBonus: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_DEFENSE_BUILDING_RESEARCH
