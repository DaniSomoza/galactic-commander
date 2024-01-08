import { IResearch } from '../../../models/ResearchModel'
import pirates from '../../races/pirates'

const PIRATE_DEFENSE_ATTACK_RESEARCH: IResearch = {
  name: 'PIRATE_DEFENSE_ATTACK_RESEARCH',
  raceName: pirates.name,
  resourceCost: 100,
  initialTime: 20_000,
  bonus: {
    defensesAttackBonus: 10
  }
}

export default PIRATE_DEFENSE_ATTACK_RESEARCH
