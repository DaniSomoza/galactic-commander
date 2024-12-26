import { AxiosResponse } from 'axios'

import { getGalaxyResponseType } from 'game-api-microservice/src/types/Planet'
import { GALAXY_PATH } from 'game-api-microservice/src/routes/constants'

import Api from '../Api'

const gameBaseEndpoint = import.meta.env.VITE_GAME_SERVICE_ORIGIN

export async function getGalaxy(
  galaxy: number,
  sector: number,
  system: number,
  universeName: string
): Promise<AxiosResponse<getGalaxyResponseType>> {
  const getGalaxyEndpoint = `${gameBaseEndpoint}${GALAXY_PATH}?galaxy=${galaxy}&sector=${sector}&system=${system}&universeName=${universeName}`

  return await Api.get<getGalaxyResponseType>(getGalaxyEndpoint)
}
