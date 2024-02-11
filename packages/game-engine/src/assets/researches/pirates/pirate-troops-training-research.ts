import { IResearch } from '../../../models/ResearchModel'

const PIRATE_TROOPS_TRAINING_RESEARCH: IResearch = {
  name: 'PIRATE_TROOPS_TRAINING_RESEARCH',
  raceName: 'pirates',
  initialTime: 23_000,
  resourceCost: 250,
  bonus: {
    troopsTrainingBonus: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_TROOPS_TRAINING_RESEARCH
