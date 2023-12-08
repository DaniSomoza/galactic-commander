import { Route } from '../configuration/Server'
import userController from '../controllers/userController'

export const USER_PATH = '/user'
export const ACTIVATE_USER_PATH = `${USER_PATH}/activate`

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

const userRoutes = [createUserRoute, activateUserRoute]

export default userRoutes
