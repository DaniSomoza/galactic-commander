import { IPlanet } from '../../types/IPlanet'

function getFleetDistance(from: IPlanet, to: IPlanet): number {
  const planetDistance = Math.abs(from.coordinates.planet - to.coordinates.planet) * 100
  const systemDistance = Math.abs(from.coordinates.system - to.coordinates.system) * 1_000
  const sectorDistance = Math.abs(from.coordinates.sector - to.coordinates.planet) * 10_000
  const galaxyDistance = Math.abs(from.coordinates.galaxy - to.coordinates.galaxy) * 100_000

  return planetDistance + systemDistance + sectorDistance + galaxyDistance
}

export default getFleetDistance
