import { StatusCodes } from 'http-status-codes'

import AppError, { errorDetails } from './AppError'

class BadRequestError extends AppError {
  message: string
  details: errorDetails

  constructor(message: string, details: errorDetails) {
    const code = StatusCodes.BAD_REQUEST
    super(message, details, code)
    this.message = message
    this.details = details
  }
}

export default BadRequestError
