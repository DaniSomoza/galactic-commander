import { IResearch } from '../../../models/ResearchModel'
import pirates from '../../races/pirates'

const PIRATE_TROOPS_POPULATION_RESEARCH: IResearch = {
  name: 'PIRATE_TROOPS_POPULATION_RESEARCH',
  raceName: pirates.name,
  initialTime: 23_000,
  resourceCost: 250,
  bonus: {
    troopsPopulationBonus: 10
  }
}

export default PIRATE_TROOPS_POPULATION_RESEARCH
