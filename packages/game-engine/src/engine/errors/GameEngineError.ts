// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type errorDetails = Record<string, any>

export type bodyErrorResponse = {
  error: string
}

class GameEngineError extends Error {
  message: string
  extraDetails?: object

  constructor(message: string, extraDetails?: object) {
    super(message)
    this.message = message
    this.extraDetails = extraDetails
  }
}

export default GameEngineError
