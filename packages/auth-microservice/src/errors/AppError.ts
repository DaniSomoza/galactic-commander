// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type errorDetails = Record<string, any>

export type bodyErrorResponse = {
  error: string
  details: errorDetails
}

class AppError extends Error {
  message: string
  details: errorDetails
  code: number

  constructor(message: string, details: errorDetails, code: number) {
    super(message)
    this.message = message
    this.details = details
    this.code = code
  }

  toBodyResponse(): bodyErrorResponse {
    return {
      error: this.message,
      details: this.details
    }
  }
}

export default AppError
