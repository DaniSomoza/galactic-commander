import { IResearch } from '../../../models/ResearchModel'
import pirates from '../../races/pirates'

const PIRATE_FLEET_SHIELD_RESEARCH: IResearch = {
  name: 'PIRATE_FLEET_SHIELD_RESEARCH',
  initialTime: 15_000,
  resourceCost: 250,
  raceName: pirates.name,
  bonus: {
    fleetShieldBonus: 10
  }
}

export default PIRATE_FLEET_SHIELD_RESEARCH
