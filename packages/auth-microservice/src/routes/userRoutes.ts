import { Route } from '../configuration/Server'
import userController from '../controllers/userController'
import { ACTIVATE_USER_PATH, LOGIN_USER_PATH, USER_PATH } from './constants'

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

const getUserRoute: Route = {
  url: USER_PATH,
  method: 'GET',
  handler: userController.getUser
}

const userRoutes = [createUserRoute, activateUserRoute, loginRoute, getUserRoute]

export default userRoutes
