import { FastifyReply, FastifyRequest } from 'fastify'
import StatusCodes from 'http-status-codes'
import Joi from 'joi'

import validateInputData from '../utils/validateInputData'
import userService from '../services/userService'
import handleErrorResponse from '../errors/handleErrorResponse'

type CreateUserData = {
  email: string
  username: string
  password: string
}

const userValidationSchema = Joi.object<CreateUserData>({
  email: Joi.string().email().required(),
  username: Joi.string().alphanum().min(5).max(30).required(),
  password: Joi.string().min(5).max(35).required()
})

async function createUser(request: FastifyRequest, response: FastifyReply) {
  try {
    await validateInputData(request.body, userValidationSchema)

    const { email, username, password } = request.body as CreateUserData

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

type activateUserData = {
  activationCode: string
}

const activationCodeSchema = Joi.object<activateUserData>({
  activationCode: Joi.string()
})

async function activateUser(request: FastifyRequest, response: FastifyReply) {
  try {
    await validateInputData(request.body, activationCodeSchema)

    const { activationCode } = request.body as activateUserData

    const userActivated = await userService.activateUser(activationCode)

    response.code(StatusCodes.OK).send(userActivated)
  } catch (error) {
    const { code, body } = handleErrorResponse(error)

    return response.code(code).send(body)
  }
}

type loginData = {
  email: string
  password: string
}

const loginSchema = Joi.object<loginData>({
  email: Joi.string().email().required(),
  password: Joi.string().min(5).max(35).required()
})

async function login(request: FastifyRequest, response: FastifyReply) {
  try {
    await validateInputData(request.body, loginSchema)

    const { email, password } = request.body as loginData

    const sessionToken = await userService.login(email, password)

    response.code(StatusCodes.OK).send({ sessionToken })
  } catch (error) {
    const { code, body } = handleErrorResponse(error)

    return response.code(code).send(body)
  }
}

const userController = {
  createUser,
  activateUser,
  login
}

export default userController
