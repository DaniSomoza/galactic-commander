import { FastifyReply, FastifyRequest } from 'fastify'
import StatusCodes from 'http-status-codes'
import Joi from 'joi'

import validateInputData from 'auth-microservice/dist/utils/validateInputData'
import handleErrorResponse from 'auth-microservice/dist/errors/handleErrorResponse'
import { checkSessionToken, getJWTFromAuthHeader } from 'auth-microservice/dist/lib/jwt'
import {
  GALAXIES,
  PLANETS_PER_SYSTEM,
  SECTORS_PER_GALAXIES,
  SYSTEM_PER_SECTORS
} from 'game-engine/dist/types/IPlanet'

import buildUnitsService from '../services/buildUnitsService'
import { StartBuildUnitsData, updateBuildUnitsQueueData } from '../types/Unit'

const buildUnitsValidationSchema = Joi.object<StartBuildUnitsData>({
  unitName: Joi.string().required(),
  unitType: Joi.string().valid('TROOP', 'SPACESHIP', 'DEFENSE').required(),
  amount: Joi.number().required(),

  planetCoordinates: Joi.object({
    galaxy: Joi.number().integer().min(1).max(GALAXIES).required(),
    sector: Joi.number().integer().min(1).max(SECTORS_PER_GALAXIES).required(),
    system: Joi.number().integer().min(1).max(SYSTEM_PER_SECTORS).required(),
    planet: Joi.number().integer().min(1).max(PLANETS_PER_SYSTEM).required()
  }),

  universeName: Joi.string().required(),

  executeTaskAt: Joi.number().optional()
})

async function startBuildUnits(request: FastifyRequest, response: FastifyReply) {
  try {
    await validateInputData(request.body, buildUnitsValidationSchema)

    const { unitName, unitType, amount, planetCoordinates, universeName, executeTaskAt } =
      request.body as StartBuildUnitsData

    const jwtToken = getJWTFromAuthHeader(request.headers.authorization)

    const { username } = checkSessionToken(jwtToken)

    const startBuildUnitsTask = await buildUnitsService.startBuildUnits({
      username,
      unitName,
      unitType,
      amount,
      planetCoordinates,
      universeName,
      executeTaskAt
    })

    response.code(StatusCodes.CREATED).send(startBuildUnitsTask)
  } catch (error) {
    const { code, body } = handleErrorResponse(error)

    return response.code(code).send(body)
  }
}

const updateBuildUnitsQueueValidationSchema = Joi.object<updateBuildUnitsQueueData>({
  buildUnitsQueue: Joi.array()
    .items(
      Joi.object({
        unitName: Joi.string().required(),
        amount: Joi.number().integer().min(1).required()
      })
    )
    .required(),

  planetCoordinates: Joi.object({
    galaxy: Joi.number().integer().min(1).max(GALAXIES).required(),
    sector: Joi.number().integer().min(1).max(SECTORS_PER_GALAXIES).required(),
    system: Joi.number().integer().min(1).max(SYSTEM_PER_SECTORS).required(),
    planet: Joi.number().integer().min(1).max(PLANETS_PER_SYSTEM).required()
  }),

  unitType: Joi.string().required(),
  universeName: Joi.string().required()
})

async function updateBuildUnitsQueue(request: FastifyRequest, response: FastifyReply) {
  try {
    await validateInputData(request.body, updateBuildUnitsQueueValidationSchema)

    const { buildUnitsQueue, unitType, universeName, planetCoordinates } =
      request.body as updateBuildUnitsQueueData

    const jwtToken = getJWTFromAuthHeader(request.headers.authorization)

    const { username } = checkSessionToken(jwtToken)

    const player = await buildUnitsService.updateBuildUnitsQueue({
      username,
      buildUnitsQueue,
      planetCoordinates,
      unitType,
      universeName
    })

    response.code(StatusCodes.OK).send(player)
  } catch (error) {
    const { code, body } = handleErrorResponse(error)

    return response.code(code).send(body)
  }
}

const buildUnitsController = {
  startBuildUnits,
  updateBuildUnitsQueue
}

export default buildUnitsController
