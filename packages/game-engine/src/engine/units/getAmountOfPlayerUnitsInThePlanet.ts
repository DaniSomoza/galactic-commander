import { IPlanet } from '../../types/IPlanet'
import { IPlayer } from '../../types/IPlayer'
import { IUnit } from '../../types/IUnit'
import isPlanetCoordinates from '../planets/isPlanetCoordinates'

function getAmountOfPlayerUnitsInThePlanet(player: IPlayer, planet: IPlanet, unit: IUnit): number {
  const planetFleet = player.fleets.find(
    (fleet) => isPlanetCoordinates(fleet.planet, planet.coordinates) && !fleet.travel
  )

  const fleetUnit = planetFleet?.units.find((fleetUnit) => fleetUnit.unit.name === unit.name)

  return fleetUnit?.amount || 0
}

export default getAmountOfPlayerUnitsInThePlanet
