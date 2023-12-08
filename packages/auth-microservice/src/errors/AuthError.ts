// TODO: improve error
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type errorDetails = Record<string, any>

export type bodyErrorResponse = {
  error: string
  details: errorDetails
}

class AuthError extends Error {
  message: string
  details: errorDetails

  constructor(message: string, details: errorDetails) {
    super(message)
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

export default AuthError
