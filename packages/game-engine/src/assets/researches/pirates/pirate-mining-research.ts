import { IResearch } from '../../../models/ResearchModel'
import pirates from '../../races/pirates'

const PIRATE_MINING_RESEARCH: IResearch = {
  name: 'PIRATE_MINING_RESEARCH',
  raceName: pirates.name,
  initialTime: 20_000,
  resourceCost: 150,
  bonus: {
    resourceProductionBonus: 10
  }
}

export default PIRATE_MINING_RESEARCH
