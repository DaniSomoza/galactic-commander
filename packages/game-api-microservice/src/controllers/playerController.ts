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

    const userCreated = await playerService.createPlayer({
      email,
      username,
      isActivated,
      raceName,
      universeName
    })

    response.code(StatusCodes.CREATED).send(userCreated)
  } catch (error) {
    const { code, body } = handleErrorResponse(error)

    return response.code(code).send(body)
  }
}

const playerController = {
  createPlayer
}

export default playerController
