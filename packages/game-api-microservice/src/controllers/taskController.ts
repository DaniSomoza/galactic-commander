import { FastifyReply, FastifyRequest } from 'fastify'
import StatusCodes from 'http-status-codes'

import handleErrorResponse from 'auth-microservice/dist/errors/handleErrorResponse'

import taskService from '../services/taskService'

async function getTask(request: FastifyRequest, response: FastifyReply) {
  try {
    const { taskId } = request.query as { taskId: string }

    const task = await taskService.getTask(taskId)

    // TODO: 404 if !task

    response.code(StatusCodes.OK).send(task)
  } catch (error) {
    const { code, body } = handleErrorResponse(error)

    return response.code(code).send(body)
  }
}

const taskController = {
  getTask
}

export default taskController
