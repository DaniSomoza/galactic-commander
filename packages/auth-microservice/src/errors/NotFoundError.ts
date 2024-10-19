import { StatusCodes } from 'http-status-codes'

import AppError, { errorDetails } from './AppError'

class NotFoundError extends AppError {
  message: string
  details: errorDetails

  constructor(message: string, details: errorDetails) {
    const code = StatusCodes.NOT_FOUND
    super(message, details, code)
    this.message = message
    this.details = details
  }
}

export default NotFoundError
