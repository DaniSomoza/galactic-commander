import { IResearch } from '../../../types/IResearch'

const PIRATE_TROOPS_HEALTH_RESEARCH: IResearch = {
  name: 'PIRATE_TROOPS_HEALTH_RESEARCH_NAME',
  description: 'PIRATE_TROOPS_HEALTH_RESEARCH_DESCRIPTION',
  raceName: 'PIRATES_RACE_NAME',
  initialTime: 20_000,
  resourceCost: 100,
  bonus: {
    TROOPS_HEALTH_BONUS: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_TROOPS_HEALTH_RESEARCH
