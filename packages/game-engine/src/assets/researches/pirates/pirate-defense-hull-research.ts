import { IResearch } from '../../../models/ResearchModel'

const PIRATE_DEFENSE_HULL_RESEARCH: IResearch = {
  name: 'PIRATE_DEFENSE_HULL_RESEARCH',
  initialTime: 15_000,
  resourceCost: 100,
  raceName: 'pirates',
  bonus: {
    defensesHullBonus: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_DEFENSE_HULL_RESEARCH
