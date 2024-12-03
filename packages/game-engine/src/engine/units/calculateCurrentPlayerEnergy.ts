import { IPlayer } from '../../types/IPlayer'

function calculateCurrentPlayerEnergy(player: IPlayer): number {
  return player.fleets.reduce((energy, fleet) => {
    const fleetEnergy = fleet.units.reduce((fleetEnergy, { unit, amount }) => {
      return unit.type === 'SPACESHIP' ? fleetEnergy + unit.energyCost * amount : fleetEnergy
    }, 0)

    return energy + fleetEnergy
  }, 0)
}

export default calculateCurrentPlayerEnergy
