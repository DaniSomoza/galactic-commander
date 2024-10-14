import { AxiosResponse } from 'axios'

import { getGameInfoResponseType } from 'game-api-microservice/src/types/Universe'
import { GAME_INFO_PATH } from 'game-api-microservice/src/routes/constants'

import Api from '../Api'

const gameBaseEndpoint = import.meta.env.VITE_GAME_SERVICE_ORIGIN

export async function getGameInfo(): Promise<AxiosResponse<getGameInfoResponseType>> {
  const getGameInfoEndpoint = `${gameBaseEndpoint}${GAME_INFO_PATH}`

  return await Api.get<getGameInfoResponseType>(getGameInfoEndpoint)
}
