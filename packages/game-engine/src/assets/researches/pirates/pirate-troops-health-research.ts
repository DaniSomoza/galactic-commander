import { IResearch } from '../../../models/ResearchModel'
import pirates from '../../races/pirates'

const PIRATE_TROOPS_HEALTH_RESEARCH: IResearch = {
  name: 'PIRATE_TROOPS_HEALTH_RESEARCH',
  raceName: pirates.name,
  initialTime: 20_000,
  resourceCost: 100,
  bonus: {
    troopsHealthBonus: 10
  }
}

export default PIRATE_TROOPS_HEALTH_RESEARCH
