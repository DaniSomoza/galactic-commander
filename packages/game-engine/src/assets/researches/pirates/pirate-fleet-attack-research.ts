import { IResearch } from '../../../models/ResearchModel'

const PIRATE_FLEET_ATTACK_RESEARCH: IResearch = {
  name: 'PIRATE_FLEET_ATTACK_RESEARCH',
  initialTime: 23_000,
  resourceCost: 200,
  raceName: 'pirates',
  bonus: {
    fleetAttackBonus: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_FLEET_ATTACK_RESEARCH
