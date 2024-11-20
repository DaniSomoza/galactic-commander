import { IResearch } from '../../../models/ResearchModel'

const PIRATE_DEFENSE_SHIELD_RESEARCH: IResearch = {
  name: 'PIRATE_DEFENSE_SHIELD_RESEARCH_NAME',
  description: 'PIRATE_DEFENSE_SHIELD_RESEARCH_DESCRIPTION',
  raceName: 'PIRATES_RACE_NAME',
  initialTime: 15_000,
  resourceCost: 150,
  bonus: {
    DEFENSES_SHIELD_BONUS: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_DEFENSE_SHIELD_RESEARCH
