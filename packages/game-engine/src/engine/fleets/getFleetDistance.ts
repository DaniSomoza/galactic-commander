import { IPlanet } from '../../types/IPlanet'

function getFleetDistance(from: IPlanet, to: IPlanet): number {
  const planetDistance = Math.abs(from.coordinates.planet - to.coordinates.planet) * 30_000
  const systemDistance = Math.abs(from.coordinates.system - to.coordinates.system) * 100_000
  const sectorDistance = Math.abs(from.coordinates.sector - to.coordinates.sector) * 1_000_000
  const galaxyDistance = Math.abs(from.coordinates.galaxy - to.coordinates.galaxy) * 10_000_000

  return planetDistance + systemDistance + sectorDistance + galaxyDistance
}

export default getFleetDistance
