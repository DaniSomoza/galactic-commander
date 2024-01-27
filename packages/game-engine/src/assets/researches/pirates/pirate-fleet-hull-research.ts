import { IResearch } from '../../../models/ResearchModel'
import pirates from '../../races/pirates'

const PIRATE_FLEET_HULL_RESEARCH: IResearch = {
  name: 'PIRATE_FLEET_HULL_RESEARCH',
  initialTime: 15_000,
  resourceCost: 150,
  raceName: pirates.name,
  bonus: {
    fleetHullBonus: 10
  },
  isTroopsPopulationResearch: false,
  isFleetEnergyResearch: false
}

export default PIRATE_FLEET_HULL_RESEARCH
