import { IResearch } from '../../../models/ResearchModel'
import pirates from '../../races/pirates'

const PIRATE_TROOPS_TRAINING_RESEARCH: IResearch = {
  name: 'PIRATE_TROOPS_TRAINING_RESEARCH',
  raceName: pirates.name,
  initialTime: 23_000,
  resourceCost: 250,
  bonus: {
    troopsTrainingBonus: 10
  }
}

export default PIRATE_TROOPS_TRAINING_RESEARCH
