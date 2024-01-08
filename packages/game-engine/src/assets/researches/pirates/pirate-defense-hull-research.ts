import { IResearch } from '../../../models/ResearchModel'
import pirates from '../../races/pirates'

const PIRATE_DEFENSE_HULL_RESEARCH: IResearch = {
  name: 'PIRATE_DEFENSE_HULL_RESEARCH',
  initialTime: 15_000,
  resourceCost: 100,
  raceName: pirates.name,
  bonus: {
    defensesHullBonus: 10
  }
}

export default PIRATE_DEFENSE_HULL_RESEARCH
