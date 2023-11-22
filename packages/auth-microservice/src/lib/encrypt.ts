import bcrypt from 'bcrypt'

const { SALT_ROUNDS } = process.env

export async function generateHash(input: string) {
  return bcrypt.hash(input, Number(SALT_ROUNDS))
}

export async function validateHash(input: string, hash: string) {
  return bcrypt.compare(input, hash)
}
