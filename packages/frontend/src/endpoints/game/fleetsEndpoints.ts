import { AxiosResponse } from 'axios'

import { explorePlanetFleetResponseType } from 'game-api-microservice/src/types/Fleets'
import { EXPLORE_PLANET_FLEET_PATH } from 'game-api-microservice/src/routes/constants'
import { PlanetCoordinatesType } from 'game-api-microservice/src/types/Planet'

import Api from '../Api'

const gameBaseEndpoint = import.meta.env.VITE_GAME_SERVICE_ORIGIN

export async function explorePlanetFleet(
  fleetUnits: { unitName: string; amount: number }[],
  fromPlanetCoordinates: PlanetCoordinatesType,
  toPlanetCoordinates: PlanetCoordinatesType,
  universeName: string,
  executeTaskAt?: number
): Promise<AxiosResponse<explorePlanetFleetResponseType>> {
  const explorePlanetFleetEndpoint = `${gameBaseEndpoint}${EXPLORE_PLANET_FLEET_PATH}`

  const payload = {
    universeName,
    fromPlanetCoordinates,
    toPlanetCoordinates,
    fleetUnits,
    executeTaskAt
  }

  return await Api.post<explorePlanetFleetResponseType, typeof payload>(
    explorePlanetFleetEndpoint,
    payload
  )
}
