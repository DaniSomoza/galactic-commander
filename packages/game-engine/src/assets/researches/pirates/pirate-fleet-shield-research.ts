import { IResearch } from '../../../models/ResearchModel'

const PIRATE_FLEET_SHIELD_RESEARCH: IResearch = {
  name: 'PIRATE_FLEET_SHIELD_RESEARCH_NAME',
  description: 'PIRATE_FLEET_SHIELD_RESEARCH_DESCRIPTION',
  raceName: 'PIRATES_RACE_NAME',
  initialTime: 15_000,
  resourceCost: 250,
  bonus: {
    FLEET_SHIELD_BONUS: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_FLEET_SHIELD_RESEARCH
