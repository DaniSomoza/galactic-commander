import { IResearch } from '../../../models/ResearchModel'
import pirates from '../../races/pirates'

const PIRATE_FLEET_SPEED_RESEARCH: IResearch = {
  name: 'PIRATE_FLEET_SPEED_RESEARCH',
  initialTime: 25_000,
  resourceCost: 200,
  raceName: pirates.name,
  bonus: {
    fleetSpeedBonus: 10
  }
}

export default PIRATE_FLEET_SPEED_RESEARCH
