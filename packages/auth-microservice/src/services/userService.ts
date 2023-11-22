import { ACTIVATE_USER_PATH } from 'auth-microservice/src/routes/userRoutes'
import { generateHash } from 'auth-microservice/src/lib/encrypt'
import userRepository from 'auth-microservice/src/repositories/userRepository'
import { sendEmail } from 'auth-microservice/src/lib/email'
import { generateActivationCode } from 'auth-microservice/src/lib/uuid'
import cleanUserFields, { CleanUserData } from 'auth-microservice/src/utils/cleanUserFields'

const { FRONTEND_ORIGIN } = process.env

type CreateUserData = {
  email: string
  username: string
  password: string
}

// TODO: create User podria recibir un segundo parametro que fuese activationLink ¿O pertenece esto a la parte de la logica de negocio?
async function createUser(newUserData: CreateUserData): Promise<CleanUserData> {
  const { username, email, password } = newUserData

  const activationCode = generateActivationCode()
  const activationLink = `${FRONTEND_ORIGIN}${ACTIVATE_USER_PATH}?activationCode=${activationCode}`

  const hashedPassword = await generateHash(password)

  // TODO: check if the user already exists ¿?

  const userCreated = await userRepository.createUser({
    username,
    email,
    password: hashedPassword, // we only store hashed passwords in our DB
    activationCode,
    isActivated: false,
    isBanned: false,
    isAdmin: false
  })

  // TODO: delete user en caso de que el envio del email falle? try y si catch hacemos delete
  await sendEmail(email, username, activationLink)

  return cleanUserFields(userCreated)
}

const userService = {
  createUser
}

export default userService
