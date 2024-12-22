import { IResearch } from '../../../types/IResearch'

const PIRATE_FLEET_ENERGY_RESEARCH: IResearch = {
  name: 'PIRATE_FLEET_ENERGY_RESEARCH_NAME',
  description: 'PIRATE_FLEET_ENERGY_RESEARCH_DESCRIPTION',
  raceName: 'PIRATES_RACE_NAME',
  initialTime: 25_000,
  resourceCost: 200,
  bonus: {},
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: true
}

export default PIRATE_FLEET_ENERGY_RESEARCH
