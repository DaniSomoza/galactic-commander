import { IResearch } from '../../../models/ResearchModel'

const PIRATE_FLEET_BUILDING_RESEARCH: IResearch = {
  name: 'PIRATE_FLEET_BUILDING_RESEARCH',
  raceName: 'pirates',
  resourceCost: 250,
  initialTime: 25_000,
  bonus: {
    fleetBuildingBonus: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_FLEET_BUILDING_RESEARCH
