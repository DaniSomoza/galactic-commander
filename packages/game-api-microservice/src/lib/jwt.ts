import jsonwebtoken from 'jsonwebtoken'

const { JWT_SECRET } = process.env

const DEFAULT_SECRET = 'secret'

type useData = { email: string; username: string }

export function verifyJWT(token: string): useData {
  return jsonwebtoken.verify(token, JWT_SECRET || DEFAULT_SECRET) as useData
}
