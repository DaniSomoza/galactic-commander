import { IResearch } from '../../../models/ResearchModel'

const PIRATE_FLEET_ENERGY_RESEARCH: IResearch = {
  name: 'PIRATE_FLEET_ENERGY_RESEARCH',
  initialTime: 25_000,
  resourceCost: 200,
  raceName: 'pirates',
  bonus: {},
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: true
}

export default PIRATE_FLEET_ENERGY_RESEARCH
