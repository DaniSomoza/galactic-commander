import { IResearch } from '../../../models/ResearchModel'
import pirates from '../../races/pirates'

const PIRATE_FLEET_ATTACK_RESEARCH: IResearch = {
  name: 'PIRATE_FLEET_ATTACK_RESEARCH',
  initialTime: 23_000,
  resourceCost: 200,
  raceName: pirates.name,
  bonus: {
    fleetAttackBonus: 10
  }
}

export default PIRATE_FLEET_ATTACK_RESEARCH
