import { IResearch } from '../../../models/ResearchModel'

const PIRATE_FLEET_SHIELD_RESEARCH: IResearch = {
  name: 'PIRATE_FLEET_SHIELD_RESEARCH',
  initialTime: 15_000,
  resourceCost: 250,
  raceName: 'pirates',
  bonus: {
    fleetShieldBonus: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_FLEET_SHIELD_RESEARCH
