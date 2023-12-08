import { Route } from '../configuration/Server'
import userController from '../controllers/userController'

export const USER_PATH = '/user'
export const ACTIVATE_USER_PATH = `${USER_PATH}/activate`
export const LOGIN_USER_PATH = `${USER_PATH}/session`

const createUserRoute: Route = {
  url: USER_PATH,
  method: 'POST',
  handler: userController.createUser
}

const activateUserRoute: Route = {
  url: ACTIVATE_USER_PATH,
  method: 'POST',
  handler: userController.activateUser
}

const loginRoute: Route = {
  url: LOGIN_USER_PATH,
  method: 'POST',
  handler: userController.login
}

const userRoutes = [createUserRoute, activateUserRoute, loginRoute]

export default userRoutes
