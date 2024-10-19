import { PlanetType } from 'game-api-microservice/src/types/Planet'

export type CoordinatesLabelType = `${string}:${string}:${string}:${string}`

function formatCoordinatesLabel(coordinates: PlanetType['coordinates']): CoordinatesLabelType {
  const { galaxy, sector, system, planet } = coordinates

  const coordinatesLabel: CoordinatesLabelType = `${galaxy}:${sector}:${system}:${planet}`

  return coordinatesLabel
}

export default formatCoordinatesLabel
