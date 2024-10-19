import { AxiosResponse } from 'axios'

import { RESEARCH_PATH, RESEARCH_QUEUE_PATH } from 'game-api-microservice/src/routes/constants'
import {
  startResearchResponseType,
  updateResearchQueueResponseType
} from 'game-api-microservice/src/types/Research'

import Api from '../Api'

const gameBaseEndpoint = import.meta.env.VITE_GAME_SERVICE_ORIGIN

export async function startResearch(
  researchName: string,
  universeName: string
): Promise<AxiosResponse<startResearchResponseType>> {
  const startResearchEndpoint = `${gameBaseEndpoint}${RESEARCH_PATH}`

  const payload = { universeName, researchName }

  return await Api.post<startResearchResponseType, typeof payload>(startResearchEndpoint, payload)
}

export async function updateResearchQueue(
  researchQueue: string[],
  universeName: string
): Promise<AxiosResponse<updateResearchQueueResponseType>> {
  const updateResearchQueueEndpoint = `${gameBaseEndpoint}${RESEARCH_QUEUE_PATH}`

  const payload = { universeName, researchQueue }

  return Api.post<updateResearchQueueResponseType, typeof payload>(
    updateResearchQueueEndpoint,
    payload
  )
}
