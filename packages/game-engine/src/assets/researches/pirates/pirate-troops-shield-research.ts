import { IResearch } from '../../../models/ResearchModel'
import pirates from '../../races/pirates'

const PIRATE_TROOPS_SHIELD_RESEARCH: IResearch = {
  name: 'PIRATE_TROOPS_SHIELD_RESEARCH',
  raceName: pirates.name,
  initialTime: 20_000,
  resourceCost: 150,
  bonus: {
    troopsShieldBonus: 10
  }
}

export default PIRATE_TROOPS_SHIELD_RESEARCH
