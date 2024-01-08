import { IResearch } from '../../../models/ResearchModel'
import pirates from '../../races/pirates'

const PIRATE_DEFENSE_SHIELD_RESEARCH: IResearch = {
  name: 'PIRATE_DEFENSE_SHIELD_RESEARCH',
  initialTime: 15_000,
  resourceCost: 150,
  raceName: pirates.name,
  bonus: {
    defensesShieldBonus: 10
  }
}

export default PIRATE_DEFENSE_SHIELD_RESEARCH
