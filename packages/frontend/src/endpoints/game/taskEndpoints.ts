import { AxiosResponse } from 'axios'

import { getTaskResponseType } from 'game-api-microservice/src/types/Task'
import { TASK_PATH } from 'game-api-microservice/src/routes/constants'

import Api from '../Api'

const gameBaseEndpoint = import.meta.env.VITE_GAME_SERVICE_ORIGIN

export async function getTask(taskId: string): Promise<AxiosResponse<getTaskResponseType>> {
  const getTaskEndpoint = `${gameBaseEndpoint}${TASK_PATH}?taskId=${taskId}`

  return await Api.get<getTaskResponseType>(getTaskEndpoint)
}
