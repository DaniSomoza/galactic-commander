import { Route } from '../configuration/Server'
import taskController from '../controllers/taskController'
import { TASK_PATH } from './constants'

const getTaskRoute: Route = {
  url: TASK_PATH,
  method: 'GET',
  handler: taskController.getTask
}

const taskRoutes = [getTaskRoute]

export default taskRoutes
