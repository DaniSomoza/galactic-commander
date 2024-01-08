import { IResearch } from '../../../models/ResearchModel'
import pirates from '../../races/pirates'

const PIRATE_RESEARCH_RESEARCH: IResearch = {
  name: 'PIRATE_RESEARCH_RESEARCH',
  raceName: pirates.name,
  initialTime: 23_000,
  resourceCost: 200,
  bonus: {
    researchBonus: 10
  }
}

export default PIRATE_RESEARCH_RESEARCH
