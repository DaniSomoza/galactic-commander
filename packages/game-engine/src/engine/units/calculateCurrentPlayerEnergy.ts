import { IFleet } from '../../types/IFleet'
import { IPlayer } from '../../types/IPlayer'
import { IPlayerUnits } from '../../types/IPlayerUnits'

function calculateCurrentPlayerEnergy(
  player: IPlayer,
  playerUnits: IPlayerUnits[],
  fleets: IFleet[]
): number {
  const energyFromFleets = fleets.reduce((energyFromFleets, fleet) => {
    const fleetEnergy = fleet.units.reduce((fleetEnergy, { unit, amount }) => {
      return fleetEnergy + unit.energyCost * amount
    }, 0)

    return energyFromFleets + fleetEnergy
  }, 0)

  const energyFromUnitsInThePlanets = playerUnits.reduce((energyFromPlanets, unitsInThePlanet) => {
    const planetEnergy = unitsInThePlanet.units.reduce((planetEnergy, { unit, amount }) => {
      return planetEnergy + unit.energyCost * amount
    }, 0)

    return energyFromPlanets + planetEnergy
  }, 0)

  // add energy from building units
  const energyFromBuildingUnits = player.planets.colonies.reduce((totalEnergy, planet) => {
    const buildTroopsEnergy = planet.unitBuild.troops.activeBuild?.energy || 0
    const buildSpaceshipsEnergy = planet.unitBuild.spaceships.activeBuild?.energy || 0
    const buildDefensesEnergy = planet.unitBuild.defenses.activeBuild?.energy || 0

    return totalEnergy + buildTroopsEnergy + buildSpaceshipsEnergy + buildDefensesEnergy
  }, 0)

  return energyFromFleets + energyFromUnitsInThePlanets + energyFromBuildingUnits
}

export default calculateCurrentPlayerEnergy
