import { IPlayer } from '../../types/IPlayer'

function calculateCurrentPlayerPopulation(player: IPlayer): number {
  return player.fleets.reduce((population, fleet) => {
    const fleetPopulation = fleet.units.reduce((fleetPopulation, { unit, amount }) => {
      return unit.type === 'TROOP' ? fleetPopulation + amount : fleetPopulation
    }, 0)

    return population + fleetPopulation
  }, 0)
}

export default calculateCurrentPlayerPopulation
