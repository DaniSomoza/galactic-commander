import { IResearch } from '../../../models/ResearchModel'

const PIRATE_FLEET_HULL_RESEARCH: IResearch = {
  name: 'PIRATE_FLEET_HULL_NAME',
  description: 'PIRATE_FLEET_HULL_DESCRIPTION',
  raceName: 'PIRATES_RACE_NAME',
  initialTime: 15_000,
  resourceCost: 150,
  bonus: {
    fleetHullBonus: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_FLEET_HULL_RESEARCH
