import { IPlanet } from '../../types/IPlanet'

function getFleetDistance(from: IPlanet, to: IPlanet): number {
  const planetDistance = Math.abs(from.coordinates.planet - to.coordinates.planet)
  const systemDistance = Math.abs(from.coordinates.system - to.coordinates.system)
  const sectorDistance = Math.abs(from.coordinates.sector - to.coordinates.sector)
  const galaxyDistance = Math.abs(from.coordinates.galaxy - to.coordinates.galaxy)

  return (
    50_000 +
    planetDistance * 20_000 +
    systemDistance * 90_000 +
    sectorDistance * 200_000 +
    galaxyDistance * 2_500_000
  )
}

export default getFleetDistance
