import { IPlayer } from '../../types/IPlayer'

function calculateCurrentPlayerEnergy(player: IPlayer): number {
  const energyFromFleets = player.fleets.reduce((energyFromFleets, fleet) => {
    const fleetEnergy = fleet.units.reduce((fleetEnergy, { unit, amount }) => {
      return unit.type === 'SPACESHIP' ? fleetEnergy + unit.energyCost * amount : fleetEnergy
    }, 0)

    return energyFromFleets + fleetEnergy
  }, 0)

  // add energy from building units
  return player.planets.colonies.reduce((totalEnergy, planet) => {
    const buildTroopsEnergy = planet.unitBuild.troops.activeBuild?.energy || 0
    const buildSpaceshipsEnergy = planet.unitBuild.spaceships.activeBuild?.energy || 0
    const buildDefensesEnergy = planet.unitBuild.defenses.activeBuild?.energy || 0

    return totalEnergy + buildTroopsEnergy + buildSpaceshipsEnergy + buildDefensesEnergy
  }, energyFromFleets)
}

export default calculateCurrentPlayerEnergy
