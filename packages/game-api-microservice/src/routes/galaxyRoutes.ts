import { Route } from '../configuration/Server'
import galaxyController from '../controllers/galaxyController'
import { GALAXY_PATH } from './constants'

const getGalaxyRoute: Route = {
  url: GALAXY_PATH,
  method: 'GET',
  handler: galaxyController.getGalaxy
}

const galaxyRoutes = [getGalaxyRoute]

export default galaxyRoutes
