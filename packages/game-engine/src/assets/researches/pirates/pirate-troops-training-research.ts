import { IResearch } from '../../../models/ResearchModel'

const PIRATE_TROOPS_TRAINING_RESEARCH: IResearch = {
  name: 'PIRATE_TROOPS_TRAINING_RESEARCH_NAME',
  description: 'PIRATE_TROOPS_TRAINING_RESEARCH_DESCRIPTION',
  imgUrl: '/researches/pirate_troops_training_research.jpg',
  raceName: 'PIRATES_RACE_NAME',
  initialTime: 23_000,
  resourceCost: 250,
  bonus: {
    troopsTrainingBonus: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_TROOPS_TRAINING_RESEARCH
