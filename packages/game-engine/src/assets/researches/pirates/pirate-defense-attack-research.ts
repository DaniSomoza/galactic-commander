import { IResearch } from '../../../models/ResearchModel'

const PIRATE_DEFENSE_ATTACK_RESEARCH: IResearch = {
  name: 'PIRATE_DEFENSE_ATTACK_RESEARCH_NAME',
  description: 'PIRATE_DEFENSE_ATTACK_RESEARCH_DESCRIPTION',
  raceName: 'PIRATES_RACE_NAME',
  resourceCost: 100,
  initialTime: 20_000,
  bonus: {
    DEFENSES_ATTACK_BONUS: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_DEFENSE_ATTACK_RESEARCH
