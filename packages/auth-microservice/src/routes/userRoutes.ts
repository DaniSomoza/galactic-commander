import { Route } from '../configuration/Server'
import userController from '../controllers/userController'

export const USER_PATH = '/user'
export const ACTIVATE_USER_PATH = '/activate-user'

const createUserRoute: Route = {
  url: USER_PATH,
  method: 'POST',
  handler: userController.createUser
}

const userRoutes = [createUserRoute]

export default userRoutes
