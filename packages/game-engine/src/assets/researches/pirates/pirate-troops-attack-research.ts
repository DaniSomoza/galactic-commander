import { IResearch } from '../../../models/ResearchModel'
import pirates from '../../races/pirates'

const PIRATE_TROOPS_ATTACK_RESEARCH: IResearch = {
  name: 'PIRATE_TROOPS_ATTACK_RESEARCH',
  initialTime: 25_000,
  raceName: pirates.name,
  resourceCost: 200,
  bonus: {
    troopsAttackBonus: 10
  }
}

export default PIRATE_TROOPS_ATTACK_RESEARCH
