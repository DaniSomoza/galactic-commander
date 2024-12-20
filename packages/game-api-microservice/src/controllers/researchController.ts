import { FastifyReply, FastifyRequest } from 'fastify'
import StatusCodes from 'http-status-codes'
import Joi from 'joi'

import validateInputData from 'auth-microservice/dist/utils/validateInputData'
import handleErrorResponse from 'auth-microservice/dist/errors/handleErrorResponse'
import { checkSessionToken, getJWTFromAuthHeader } from 'auth-microservice/dist/lib/jwt'

import researchService from '../services/researchService'
import { StartResearchData, updateResearchQueueData } from '../types/Research'

const researchValidationSchema = Joi.object<StartResearchData>({
  researchName: Joi.string().required(),
  universeName: Joi.string().required(),
  executeTaskAt: Joi.number().optional()
})

async function startResearch(request: FastifyRequest, response: FastifyReply) {
  try {
    await validateInputData(request.body, researchValidationSchema)

    const { researchName, universeName, executeTaskAt } = request.body as StartResearchData

    const jwtToken = getJWTFromAuthHeader(request.headers.authorization)

    const { username } = checkSessionToken(jwtToken)

    const startResearchTask = await researchService.startResearch({
      username,
      researchName,
      universeName,
      executeTaskAt
    })

    response.code(StatusCodes.CREATED).send(startResearchTask)
  } catch (error) {
    const { code, body } = handleErrorResponse(error)

    return response.code(code).send(body)
  }
}

const updateResearchQueueValidationSchema = Joi.object<updateResearchQueueData>({
  researchQueue: Joi.array().items(Joi.string()).required(),
  universeName: Joi.string().required()
})

async function updateResearchQueue(request: FastifyRequest, response: FastifyReply) {
  try {
    await validateInputData(request.body, updateResearchQueueValidationSchema)

    const { researchQueue, universeName } = request.body as updateResearchQueueData

    const jwtToken = getJWTFromAuthHeader(request.headers.authorization)

    const { username } = checkSessionToken(jwtToken)

    const player = await researchService.updateResearchQueue({
      username,
      researchQueue,
      universeName
    })

    response.code(StatusCodes.OK).send(player)
  } catch (error) {
    const { code, body } = handleErrorResponse(error)

    return response.code(code).send(body)
  }
}

const researchController = {
  startResearch,
  updateResearchQueue
}

export default researchController
