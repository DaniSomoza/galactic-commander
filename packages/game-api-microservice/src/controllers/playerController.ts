import { FastifyReply, FastifyRequest } from 'fastify'
import StatusCodes from 'http-status-codes'
import Joi from 'joi'

import validateInputData from 'auth-microservice/dist/utils/validateInputData'
import handleErrorResponse from 'auth-microservice/dist/errors/handleErrorResponse'
import UnauthorizedError from 'auth-microservice/dist/errors/Unauthorized'
import { verifyJWT } from 'auth-microservice/dist/lib/jwt'

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

    // TODO: create a helper for this in the auth-service
    const authorizationHeader = request.headers.authorization
    const jwtToken = authorizationHeader?.replace('Bearer ', '') || ''

    const { username, email } = checkSessionToken(jwtToken)

    const userCreated = await playerService.createPlayer({
      email,
      username,
      raceName,
      universeName
    })

    response.code(StatusCodes.CREATED).send(userCreated)
  } catch (error) {
    const { code, body } = handleErrorResponse(error)

    return response.code(code).send(body)
  }
}

function checkSessionToken(jwtToken: string) {
  try {
    return verifyJWT(jwtToken)
  } catch (error) {
    throw new UnauthorizedError('invalid session token', { jwtToken })
  }
}

const playerController = {
  createPlayer
}

export default playerController
