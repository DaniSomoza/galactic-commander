import { FastifyReply, FastifyRequest } from 'fastify'
import StatusCodes from 'http-status-codes'
import Joi from 'joi'

// TODO: check package.json
import validateInputData from 'auth-microservice/dist/utils/validateInputData'
import handleErrorResponse from 'auth-microservice/dist/errors/handleErrorResponse'
import { checkSessionToken, getJWTFromAuthHeader } from 'auth-microservice/dist/lib/jwt'
import {
  GALAXIES,
  PLANETS_PER_SYSTEM,
  SECTORS_PER_GALAXIES,
  SYSTEM_PER_SECTORS
} from 'game-engine/dist/types/IPlanet'

import fleetService from '../services/fleetService'
import { ExplorePlanetData } from '../types/Fleets'

const explorePlanetFleetValidationSchema = Joi.object<ExplorePlanetData>({
  universeName: Joi.string().required(),
  toPlanetCoordinates: Joi.object({
    galaxy: Joi.number().integer().min(1).max(GALAXIES).required(),
    sector: Joi.number().integer().min(1).max(SECTORS_PER_GALAXIES).required(),
    system: Joi.number().integer().min(1).max(SYSTEM_PER_SECTORS).required(),
    planet: Joi.number().integer().min(1).max(PLANETS_PER_SYSTEM).required()
  }),

  fromPlanetCoordinates: Joi.object({
    galaxy: Joi.number().integer().min(1).max(GALAXIES).required(),
    sector: Joi.number().integer().min(1).max(SECTORS_PER_GALAXIES).required(),
    system: Joi.number().integer().min(1).max(SYSTEM_PER_SECTORS).required(),
    planet: Joi.number().integer().min(1).max(PLANETS_PER_SYSTEM).required()
  }),
  fleetUnits: Joi.array()
    .items(
      Joi.object({
        unitName: Joi.string().required(),
        amount: Joi.number().integer().min(1).required()
      })
    )
    .min(1)
    .required(),

  executeTaskAt: Joi.number().optional()
})

async function explorePlanet(request: FastifyRequest, response: FastifyReply) {
  try {
    await validateInputData(request.body, explorePlanetFleetValidationSchema)

    const jwtToken = getJWTFromAuthHeader(request.headers.authorization)

    const { username } = checkSessionToken(jwtToken)

    const { fromPlanetCoordinates, toPlanetCoordinates, universeName, fleetUnits } =
      request.body as ExplorePlanetData

    const newExplorePlanetTask = await fleetService.explorePlanet({
      username,
      universeName,
      fromPlanetCoordinates,
      toPlanetCoordinates,
      fleetUnits
    })

    response.code(StatusCodes.CREATED).send(newExplorePlanetTask)
  } catch (error) {
    const { code, body } = handleErrorResponse(error)

    return response.code(code).send(body)
  }
}

const fleetController = {
  explorePlanet
}

export default fleetController
