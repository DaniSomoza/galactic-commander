import { IResearch } from '../../../models/ResearchModel'

const PIRATE_FLEET_CARGO_RESEARCH: IResearch = {
  name: 'PIRATE_FLEET_CARGO_RESEARCH',
  initialTime: 15_000,
  resourceCost: 100,
  raceName: 'pirates',
  bonus: {
    fleetCargoBonus: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_FLEET_CARGO_RESEARCH
