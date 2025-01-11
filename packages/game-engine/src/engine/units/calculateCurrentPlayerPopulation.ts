import { IFleet } from '../../types/IFleet'
import { IPlayer } from '../../types/IPlayer'
import { IPlayerUnits } from '../../types/IPlayerUnits'

function calculateCurrentPlayerPopulation(
  player: IPlayer,
  playerUnits: IPlayerUnits[],
  fleets: IFleet[]
): number {
  // fleet troops
  const fleetPopulation = fleets.reduce((population, fleet) => {
    const fleetPopulation = fleet.units.reduce((fleetPopulation, { unit, amount }) => {
      return unit.type === 'TROOP' ? fleetPopulation + amount : fleetPopulation
    }, 0)

    return population + fleetPopulation
  }, 0)

  // fleet troops
  const planetPopulation = playerUnits.reduce((population, playerUnit) => {
    const planetPopulation = playerUnit.units.reduce((planetPopulation, { unit, amount }) => {
      return unit.type === 'TROOP' ? planetPopulation + amount : planetPopulation
    }, 0)

    return population + planetPopulation
  }, 0)

  // troops under construction
  const populationUnderConstruction = player.planets.colonies.reduce((energy, planet) => {
    const amount = planet.unitBuild.troops.activeBuild?.amount || 0

    return energy + amount
  }, 0)

  return fleetPopulation + planetPopulation + populationUnderConstruction
}

export default calculateCurrentPlayerPopulation
