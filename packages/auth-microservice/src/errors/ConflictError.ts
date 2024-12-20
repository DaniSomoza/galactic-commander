import { StatusCodes } from 'http-status-codes'

import AppError, { errorDetails } from './AppError'

class ConflictError extends AppError {
  message: string
  details: errorDetails

  constructor(message: string, details: errorDetails) {
    const code = StatusCodes.CONFLICT
    super(message, details, code)
    this.message = message
    this.details = details
  }
}

export default ConflictError
