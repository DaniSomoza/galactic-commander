import { generateHash, validateHash } from '../lib/encrypt'
import { sendEmail } from '../lib/email'
import { generateActivationCode } from '../lib/uuid'
import { ACTIVATE_USER_PATH } from '../routes/userRoutes'
import userRepository from '../repositories/userRepository'
import cleanUserFields, { CleanUserData } from '../utils/cleanUserFields'
import NotFoundError from '../errors/NotFoundError'
import ConflictError from '../errors/ConflictError'
import ForbiddenError from '../errors/Forbidden'
import UnauthorizedError from '../errors/Unauthorized'
import { createJWT, verifyJWT } from '../lib/jwt'

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

async function login(email: string, password: string) {
  const user = await userRepository.findUserByEmail(email)

  if (!user) {
    throw new NotFoundError('user not found', { email })
  }

  const isPasswordValid = await validateHash(password, user.password)

  if (!isPasswordValid) {
    throw new UnauthorizedError('wrong credentials', { email })
  }

  const isUserActivated = user.isActivated
  const isUserBanned = user.isBanned
  const userData = cleanUserFields(user)

  if (!isUserActivated) {
    throw new ForbiddenError('user not activated', userData)
  }

  if (isUserBanned) {
    throw new ForbiddenError('user banned', userData)
  }

  const sessionToken = createJWT(userData)

  return {
    user: userData,
    sessionToken
  }
}

function checkSessionToken(jwtToken: string) {
  try {
    return verifyJWT(jwtToken)
  } catch (error) {
    throw new UnauthorizedError('invalid session token', { jwtToken })
  }
}

async function getUser(jwtToken: string) {
  const userData = checkSessionToken(jwtToken)

  const user = await userRepository.findUserByEmail(userData.email)

  if (!user) {
    throw new NotFoundError('user not found', userData)
  }

  const isUserActivated = user.isActivated
  const isUserBanned = user.isBanned

  if (!isUserActivated) {
    throw new ForbiddenError('user not activated', userData)
  }

  if (isUserBanned) {
    throw new ForbiddenError('user banned', userData)
  }

  return cleanUserFields(user)
}

const userService = {
  createUser,
  activateUser,
  login,
  getUser
}

export default userService
