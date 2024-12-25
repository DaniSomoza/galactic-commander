import { IFleetUnits } from '../../types/IFleet'
import { IPlayer } from '../../types/IPlayer'
import computedBonus from '../bonus/computedBonus'
import getBaseFleetSpeed from './getBaseFleetSpeed'

// TODO: create an util
function getFleetSpeed(units: IFleetUnits[], player: IPlayer): number {
  const baseFleetSpeed = getBaseFleetSpeed(units)
  const fleetSpeedBonus = computedBonus(player.perks, 'FLEET_SPEED_BONUS')

  const fleetSpeed = fleetSpeedBonus * baseFleetSpeed

  return fleetSpeed
}

export default getFleetSpeed
