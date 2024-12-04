import { AxiosResponse } from 'axios'

import {
  BUILD_UNITS_PATH,
  BUILD_UNITS_QUEUE_PATH
} from 'game-api-microservice/src/routes/constants'
import {
  startBuildUnitsResponseType,
  UnitTypes,
  updateBuildUnitsQueueResponseType
} from 'game-api-microservice/src/types/Unit'
import { PlanetCoordinatesType } from 'game-api-microservice/src/types/Planet'

import Api from '../Api'

const gameBaseEndpoint = import.meta.env.VITE_GAME_SERVICE_ORIGIN

export async function startBuildUnits(
  unitName: string,
  unitType: string,
  amount: number,
  planetCoordinates: PlanetCoordinatesType,
  universeName: string
): Promise<AxiosResponse<startBuildUnitsResponseType>> {
  const startBuildUnitsEndpoint = `${gameBaseEndpoint}${BUILD_UNITS_PATH}`

  const payload = { universeName, unitName, unitType, amount, planetCoordinates }

  return await Api.post<startBuildUnitsResponseType, typeof payload>(
    startBuildUnitsEndpoint,
    payload
  )
}

export async function updateBuildUnitsQueue(
  buildUnitsQueue: { unitName: string; amount: number }[],
  planetCoordinates: PlanetCoordinatesType,
  unitType: UnitTypes,
  universeName: string
): Promise<AxiosResponse<updateBuildUnitsQueueResponseType>> {
  const updateBuildUnitsQueueEndpoint = `${gameBaseEndpoint}${BUILD_UNITS_QUEUE_PATH}`

  const payload = { universeName, buildUnitsQueue, planetCoordinates, unitType }

  return Api.post<updateBuildUnitsQueueResponseType, typeof payload>(
    updateBuildUnitsQueueEndpoint,
    payload
  )
}
