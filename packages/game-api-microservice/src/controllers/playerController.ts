import { FastifyReply, FastifyRequest } from 'fastify'
import StatusCodes from 'http-status-codes'
import Joi from 'joi'

import validateInputData from 'auth-microservice/dist/utils/validateInputData'
import handleErrorResponse from 'auth-microservice/dist/errors/handleErrorResponse'
import { checkSessionToken, getJWTFromAuthHeader } from 'auth-microservice/dist/lib/jwt'

import playerService from '../services/playerService'

type CreatePlayerData = {
  raceName: string
  universeName: string
}

const playerValidationSchema = Joi.object<CreatePlayerData>({
  raceName: Joi.string().required(),
  universeName: Joi.string().required()
})

async function createPlayer(request: FastifyRequest, response: FastifyReply) {
  try {
    await validateInputData(request.body, playerValidationSchema)

    const { raceName, universeName } = request.body as CreatePlayerData

    const jwtToken = getJWTFromAuthHeader(request.headers.authorization)

    const { username, email, isActivated } = checkSessionToken(jwtToken)

    const newPlayerTask = await playerService.createPlayer({
      email,
      username,
      isActivated,
      raceName,
      universeName
    })

    response.code(StatusCodes.CREATED).send(newPlayerTask)
  } catch (error) {
    const { code, body } = handleErrorResponse(error)

    return response.code(code).send(body)
  }
}

async function getPlayer(request: FastifyRequest, response: FastifyReply) {
  try {
    const jwtToken = getJWTFromAuthHeader(request.headers.authorization)

    const { username } = checkSessionToken(jwtToken)

    const { universeName } = request.query as { universeName: string }

    const player = await playerService.getPlayer(username, universeName)

    response.code(StatusCodes.OK).send(player)
  } catch (error) {
    const { code, body } = handleErrorResponse(error)

    return response.code(code).send(body)
  }
}

const playerController = {
  createPlayer,
  getPlayer
}

export default playerController
