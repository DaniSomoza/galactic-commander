import { FastifyReply, FastifyRequest } from 'fastify'
import StatusCodes from 'http-status-codes'
import Joi from 'joi'

import validateInputData from '../utils/validateInputData'
import playerService from '../services/playerService'
import handleErrorResponse from '../errors/handleErrorResponse'
import { verifyJWT } from '../lib/jwt'
import UnauthorizedError from '../errors/Unauthorized'

type CreatePlayerData = {
  race: string
}

const playerValidationSchema = Joi.object<CreatePlayerData>({
  race: Joi.string().required()
})

async function createPlayer(request: FastifyRequest, response: FastifyReply) {
  try {
    await validateInputData(request.body, playerValidationSchema)

    const { race } = request.body as CreatePlayerData

    const authorizationHeader = request.headers.authorization
    const jwtToken = authorizationHeader?.replace('Bearer ', '') || ''

    const { username, email } = checkSessionToken(jwtToken)

    const userCreated = await playerService.createPlayer({
      email,
      username,
      race
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
