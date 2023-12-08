import { generateHash } from '../lib/encrypt'
import { sendEmail } from '../lib/email'
import { generateActivationCode } from '../lib/uuid'
import { ACTIVATE_USER_PATH } from '../routes/userRoutes'
import userRepository from '../repositories/userRepository'
import cleanUserFields, { CleanUserData } from '../utils/cleanUserFields'
import NotFoundError from '../errors/NotFoundError'
import ConflictError from '../errors/ConflictError'

const { FRONTEND_ORIGIN } = process.env

type CreateUserData = {
  email: string
  username: string
  password: string
}

async function createUser(newUserData: CreateUserData): Promise<CleanUserData> {
  const { username, email, password } = newUserData

  const activationCode = generateActivationCode()
  const activationLink = `${FRONTEND_ORIGIN}${ACTIVATE_USER_PATH}?activationCode=${activationCode}`

  const hashedPassword = await generateHash(password)

  const userCreated = await userRepository.createUser({
    username,
    email,
    password: hashedPassword, // we only store hashed passwords in our database
    activationCode,
    isActivated: false,
    isBanned: false,
    isAdmin: false
  })

  sendEmail(email, username, activationLink)

  return cleanUserFields(userCreated)
}

async function activateUser(activationCode: string) {
  const user = await userRepository.findUserByActivationCode(activationCode)

  if (!user) {
    throw new NotFoundError('invalid activation code', { activationCode })
  }

  const isAlreadyActivated = user.isActivated

  if (isAlreadyActivated) {
    throw new ConflictError('user already activated', { user: cleanUserFields(user) })
  }

  const userActivated = await userRepository.updateUser(user._id.toString(), { isActivated: true })

  return cleanUserFields(userActivated!)
}

const userService = {
  createUser,
  activateUser
}

export default userService
