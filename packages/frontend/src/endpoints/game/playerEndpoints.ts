import { AxiosResponse } from 'axios'

import {
  createPlayerResponseType,
  getPlayerResponseType
} from 'game-api-microservice/src/types/Player'
import { PLAYER_PATH } from 'game-api-microservice/src/routes/constants'

import Api from '../Api'

const gameBaseEndpoint = import.meta.env.VITE_GAME_SERVICE_ORIGIN

export async function getPlayer(
  universeName: string
): Promise<AxiosResponse<getPlayerResponseType>> {
  const getPlayerEndpoint = `${gameBaseEndpoint}${PLAYER_PATH}?universeName=${universeName}`

  return await Api.get<getPlayerResponseType>(getPlayerEndpoint)
}

export async function createPlayer(
  universeName: string,
  raceName: string
): Promise<AxiosResponse<createPlayerResponseType>> {
  const createPlayerEndpoint = `${gameBaseEndpoint}${PLAYER_PATH}`

  const payload = { universeName, raceName }

  return await Api.post<createPlayerResponseType, typeof payload>(createPlayerEndpoint, payload)
}
