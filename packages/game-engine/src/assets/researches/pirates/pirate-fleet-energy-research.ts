import { IResearch } from '../../../models/ResearchModel'
import pirates from '../../races/pirates'

const PIRATE_FLEET_ENERGY_RESEARCH: IResearch = {
  name: 'PIRATE_FLEET_ENERGY_RESEARCH',
  initialTime: 25_000,
  resourceCost: 200,
  raceName: pirates.name,
  bonus: {
    fleetEnergyBonus: 10
  }
}

export default PIRATE_FLEET_ENERGY_RESEARCH
