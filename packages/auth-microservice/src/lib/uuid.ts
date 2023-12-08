import { v4 as uuidv4 } from 'uuid'

export function generateActivationCode(): string {
  return uuidv4()
}
