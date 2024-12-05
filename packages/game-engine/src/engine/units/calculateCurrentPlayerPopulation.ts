import { IPlayer } from '../../types/IPlayer'

function calculateCurrentPlayerPopulation(player: IPlayer): number {
  const population = player.fleets.reduce((population, fleet) => {
    const fleetPopulation = fleet.units.reduce((fleetPopulation, { unit, amount }) => {
      return unit.type === 'TROOP' ? fleetPopulation + amount : fleetPopulation
    }, 0)

    return population + fleetPopulation
  }, 0)

  // add troops under construction
  return player.planets.colonies.reduce((energy, planet) => {
    const amount = planet.unitBuild.troops.activeBuild?.amount || 0

    return energy + amount
  }, population)
}

export default calculateCurrentPlayerPopulation
