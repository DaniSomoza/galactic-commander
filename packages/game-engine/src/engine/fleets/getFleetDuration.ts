import { IFleetUnits } from '../../types/IFleet'
import { IPlanet } from '../../types/IPlanet'
import { IPlayer } from '../../types/IPlayer'
import getFleetDistance from './getFleetDistance'
import getFleetSpeed from './getFleetSpeed'

function getFleetDuration(
  from: IPlanet,
  to: IPlanet,
  units: IFleetUnits[],
  player: IPlayer
): number {
  const distance = getFleetDistance(from, to)
  const fleetSpeed = getFleetSpeed(units, player)

  const duration = Math.trunc(distance / fleetSpeed)

  return duration * 1_000
}

export default getFleetDuration
