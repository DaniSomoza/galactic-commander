import { StatusCodes } from 'http-status-codes'
import AppError, { bodyErrorResponse, errorDetails } from './AppError'

class UnauthorizedError extends AppError {
  message: string
  details: errorDetails

  constructor(message: string, details: errorDetails) {
    const code = StatusCodes.UNAUTHORIZED
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

export default UnauthorizedError
