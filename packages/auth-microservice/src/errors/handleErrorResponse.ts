import { MongoServerError } from 'mongodb'
import StatusCodes from 'http-status-codes'
import Joi from 'joi'

import { bodyErrorResponse } from 'auth-microservice/src/errors/AuthError'

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

  if (error instanceof MongoServerError) {
    // handle duplicated key error.code === 11000 || error.code === 11001
    return {
      code: CONFLICT,
      body: {
        error: error.message,
        details: {
          // TODO: improve this
          keyPattern: error.keyPattern,
          keyValue: error.keyValue
        }
        // code: error.code,
        // keyPattern: error.keyPattern,
        // keyValue: error.keyValue,
      }
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
