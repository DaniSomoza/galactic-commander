import { FastifyReply, FastifyRequest } from 'fastify'
import StatusCodes from 'http-status-codes'

import handleErrorResponse from 'auth-microservice/dist/errors/handleErrorResponse'
import { checkSessionToken, getJWTFromAuthHeader } from 'auth-microservice/dist/lib/jwt'

import galaxyService from '../services/galaxyService'

async function getGalaxy(request: FastifyRequest, response: FastifyReply) {
  try {
    const { galaxy, sector, system, universeName } = request.query as {
      galaxy: string
      sector: string
      system: string
      universeName: string
    }

    const jwtToken = getJWTFromAuthHeader(request.headers.authorization)

    const { username } = checkSessionToken(jwtToken)

    const coordinates = {
      galaxy,
      sector,
      system
    }

    const planets = await galaxyService.getGalaxy(username, universeName, coordinates)

    response.code(StatusCodes.OK).send(planets)
  } catch (error) {
    const { code, body } = handleErrorResponse(error)

    return response.code(code).send(body)
  }
}

const galaxyController = {
  getGalaxy
}

export default galaxyController
