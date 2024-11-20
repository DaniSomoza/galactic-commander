import { FastifyReply, FastifyRequest } from 'fastify'
import StatusCodes from 'http-status-codes'

import handleErrorResponse from 'auth-microservice/dist/errors/handleErrorResponse'

import gameInfoService from '../services/gameInfoService'

async function getGameInfo(request: FastifyRequest, response: FastifyReply) {
  try {
    const gameInfo = await gameInfoService.getGameInfo()

    response.code(StatusCodes.OK).send(gameInfo)
  } catch (error) {
    const { code, body } = handleErrorResponse(error)

    return response.code(code).send(body)
  }
}

const getGameController = {
  getGameInfo
}

export default getGameController
