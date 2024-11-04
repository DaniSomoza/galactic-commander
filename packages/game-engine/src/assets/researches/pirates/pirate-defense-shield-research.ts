import { IResearch } from '../../../models/ResearchModel'

const PIRATE_DEFENSE_SHIELD_RESEARCH: IResearch = {
  name: 'PIRATE_DEFENSE_SHIELD_RESEARCH_NAME',
  description: 'PIRATE_DEFENSE_SHIELD_RESEARCH_DESCRIPTION',
  imgUrl: '/researches/pirate_defense_shield_research.jpg',
  raceName: 'PIRATES_RACE_NAME',
  initialTime: 15_000,
  resourceCost: 150,
  bonus: {
    defensesShieldBonus: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_DEFENSE_SHIELD_RESEARCH
