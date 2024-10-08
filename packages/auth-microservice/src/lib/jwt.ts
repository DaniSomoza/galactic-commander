import jsonwebtoken from 'jsonwebtoken'

import UnauthorizedError from '../errors/Unauthorized'
import { CleanUserData } from '../utils/cleanUserFields'

const { JWT_SECRET, JWT_EXPIRATION_TIME } = process.env

const DEFAULT_SECRET = 'secret'
const DEFAULT_JWT_EXPIRATION_TIME = '7d'

export function createJWT(payload: CleanUserData) {
  return jsonwebtoken.sign(payload, JWT_SECRET || DEFAULT_SECRET, {
    expiresIn: JWT_EXPIRATION_TIME || DEFAULT_JWT_EXPIRATION_TIME
  })
}

export function verifyJWT(token: string): CleanUserData {
  return jsonwebtoken.verify(token, JWT_SECRET || DEFAULT_SECRET) as CleanUserData
}

export function checkSessionToken(jwtToken: string) {
  try {
    return verifyJWT(jwtToken)
  } catch {
    throw new UnauthorizedError('invalid session token', { jwtToken })
  }
}

export function getJWTFromAuthHeader(authorizationHeader?: string): string {
  return authorizationHeader?.replace('Bearer ', '') || ''
}
