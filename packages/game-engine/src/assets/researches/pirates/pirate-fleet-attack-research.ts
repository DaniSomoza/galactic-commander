import { IResearch } from '../../../models/ResearchModel'

const PIRATE_FLEET_ATTACK_RESEARCH: IResearch = {
  name: 'PIRATE_FLEET_ATTACK_RESEARCH_NAME',
  description: 'PIRATE_FLEET_ATTACK_RESEARCH_DESCRIPTION',
  raceName: 'PIRATES_RACE_NAME',
  initialTime: 23_000,
  resourceCost: 200,
  bonus: {
    fleetAttackBonus: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_FLEET_ATTACK_RESEARCH
