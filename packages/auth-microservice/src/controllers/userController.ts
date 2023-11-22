import { FastifyReply, FastifyRequest } from 'fastify'
import StatusCodes from 'http-status-codes'
import Joi from 'joi'

import validateInputData from 'auth-microservice/src/utils/validateInputData'
import userService from 'auth-microservice/src/services/userService'
import handleErrorResponse from 'auth-microservice/src/errors/handleErrorResponse'

type CreateUserData = {
  email: string
  username: string
  password: string
}

const userValidationSchema = Joi.object<CreateUserData>({
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().min(5).max(30).required(),
  password: Joi.string().min(5).max(15).required()
})

// TODO: configure prettier!!! remove ;

async function createUser(request: FastifyRequest, response: FastifyReply) {
  try {
    await validateInputData(request.body, userValidationSchema)

    // TODO: improve this!
    const { email, username, password } = request.body as CreateUserData

    // TODO: to lowercase ???

    const userCreated = await userService.createUser({
      email,
      username,
      password
    })

    response.code(StatusCodes.CREATED).send(userCreated)
  } catch (error) {
    const { code, body } = handleErrorResponse(error)

    return response.code(code).send(body)
  }
}

const userController = {
  createUser
}

export default userController
