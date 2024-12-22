import { IPlanet, IPlanetCoordinates } from '../../types/IPlanet'

function isPlanetCoordinates(planet: IPlanet, coordinates: IPlanetCoordinates): boolean {
  return (
    planet.coordinates.galaxy === coordinates.galaxy &&
    planet.coordinates.sector === coordinates.sector &&
    planet.coordinates.system === coordinates.system &&
    planet.coordinates.planet === coordinates.planet
  )
}

export default isPlanetCoordinates
