// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type errorDetails = Record<string, any>

export type bodyErrorResponse = {
  error: string
}

class GameEngineError extends Error {
  message: string

  constructor(message: string) {
    super(message)
    this.message = message
  }
}

export default GameEngineError
