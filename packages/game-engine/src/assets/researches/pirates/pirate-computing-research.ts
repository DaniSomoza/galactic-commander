import { IResearch } from '../../../models/ResearchModel'
import pirates from '../../races/pirates'

const PIRATE_COMPUTING_RESEARCH: IResearch = {
  name: 'PIRATE_COMPUTING_RESEARCH',
  raceName: pirates.name,
  bonus: {
    maxFleetsAllowedBonus: 1
  },
  resourceCost: 100,
  initialTime: 20_000,
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_COMPUTING_RESEARCH
