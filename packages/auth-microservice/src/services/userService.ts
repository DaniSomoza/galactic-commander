import { generateHash, validateHash } from '../lib/encrypt'
import { sendEmail } from '../lib/email'
import { generateActivationCode } from '../lib/uuid'
import { ACTIVATE_USER_PATH } from '../routes/constants'
import userRepository from '../repositories/userRepository'
import cleanUserFields from '../utils/cleanUserFields'
import NotFoundError from '../errors/NotFoundError'
import ConflictError from '../errors/ConflictError'
import ForbiddenError from '../errors/Forbidden'
import UnauthorizedError from '../errors/Unauthorized'
import { createJWT, checkSessionToken } from '../lib/jwt'
import getFrontendOrigins from '../utils/getFrontendOrigins'
import {
  CreateUserData,
  LoginResponseType,
  createUserResponseType,
  getUserResponseType,
  userActivationResponseType
} from '../types/User'

const frontendOrigins = getFrontendOrigins()

async function createUser(newUserData: CreateUserData): Promise<createUserResponseType> {
  const { username, email, password } = newUserData

  const activationCode = generateActivationCode()
  const activationLink = `${frontendOrigins[0]}${ACTIVATE_USER_PATH}?activationCode=${activationCode}`

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

  return { user: cleanUserFields(userCreated) }
}

async function activateUser(activationCode: string): Promise<userActivationResponseType> {
  const user = await userRepository.findUserByActivationCode(activationCode)

  if (!user) {
    throw new NotFoundError('invalid activation code', { activationCode })
  }

  const isAlreadyActivated = user.isActivated

  if (isAlreadyActivated) {
    throw new ConflictError('user already activated', { user: cleanUserFields(user) })
  }

  const userActivated = await userRepository.updateUser(user._id.toString(), { isActivated: true })

  if (!userActivated) {
    throw new ConflictError('error, unable to activate the user', { user: cleanUserFields(user) })
  }

  return {
    user: cleanUserFields(userActivated)
  }
}

async function login(email: string, password: string): Promise<LoginResponseType> {
  const user = await userRepository.findUserByEmail(email)

  if (!user) {
    throw new NotFoundError('user not found', { email })
  }

  const isPasswordValid = await validateHash(password, user.password)

  if (!isPasswordValid) {
    throw new UnauthorizedError('wrong credentials', { email })
  }

  const userData = cleanUserFields(user)
  const isUserActivated = user.isActivated

  if (!isUserActivated) {
    throw new ForbiddenError('user not activated', userData)
  }

  const isUserBanned = user.isBanned

  if (isUserBanned) {
    throw new ForbiddenError('user banned', userData)
  }

  const sessionToken = createJWT(userData)

  return {
    user: userData,
    sessionToken
  }
}

async function getUser(jwtToken: string): Promise<getUserResponseType> {
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

  return { user: cleanUserFields(user) }
}

const userService = {
  createUser,
  activateUser,
  login,
  getUser
}

export default userService
