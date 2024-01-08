import { IResearch } from '../../../models/ResearchModel'
import pirates from '../../races/pirates'

const PIRATE_FLEET_CARGO_RESEARCH: IResearch = {
  name: 'PIRATE_FLEET_CARGO_RESEARCH',
  initialTime: 15_000,
  resourceCost: 100,
  raceName: pirates.name,
  bonus: {
    fleetCargoBonus: 10
  }
}

export default PIRATE_FLEET_CARGO_RESEARCH
