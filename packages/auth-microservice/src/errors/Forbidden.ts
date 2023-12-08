import { StatusCodes } from 'http-status-codes'
import AppError, { bodyErrorResponse, errorDetails } from './AppError'

class ForbiddenError extends AppError {
  message: string
  details: errorDetails

  constructor(message: string, details: errorDetails) {
    const code = StatusCodes.FORBIDDEN
    super(message, details, code)
    this.message = message
    this.details = details
  }

  toBodyResponse(): bodyErrorResponse {
    return {
      error: this.message,
      details: this.details
    }
  }
}

export default ForbiddenError
