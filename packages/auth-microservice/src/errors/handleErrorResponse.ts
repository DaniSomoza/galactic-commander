import { MongoServerError } from 'mongodb'
import StatusCodes from 'http-status-codes'
import Joi from 'joi'

import AppError, { bodyErrorResponse } from './AppError'

const { BAD_REQUEST, CONFLICT, INTERNAL_SERVER_ERROR } = StatusCodes

type ErrorResponse = {
  code: number
  body: bodyErrorResponse
}

function handleErrorResponse(error: unknown): ErrorResponse {
  // TODO: improve Error handler!

  // idea: crear una clase AuthError que actua Mappeador de estos errores a algo unificado

  if (error instanceof Joi.ValidationError) {
    return {
      code: BAD_REQUEST,
      body: {
        error: error.message,
        details: error.details
      }
    }
  }

  if (error?.constructor?.name === 'MongoServerError') {
    // handle duplicated key error.code === 11000 || error.code === 11001
    const mongoError = error as MongoServerError
    return {
      code: CONFLICT,
      body: {
        error: mongoError.message,
        details: {
          // TODO: improve this
          keyPattern: mongoError.keyPattern,
          keyValue: mongoError.keyValue
        }
        // code: error.code,
        // keyPattern: error.keyPattern,
        // keyValue: error.keyValue,
      }
    }
  }

  if (error instanceof AppError) {
    return {
      code: error.code,
      body: error.toBodyResponse()
    }
  }

  // en caso de que no se sepa qué error es
  return {
    code: INTERNAL_SERVER_ERROR,
    body: {
      // TODO: create unknown response
      error: 'Internal Server error',
      details: {
        error: 'Internal Server error'
      }
    }
  }
}

export default handleErrorResponse
