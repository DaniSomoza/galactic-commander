import { Route } from '../configuration/Server'
import { EXPLORE_PLANET_FLEET_PATH } from './constants'
import fleetController from '../controllers/fleetController'

const explorePlanetRoute: Route = {
  url: EXPLORE_PLANET_FLEET_PATH,
  method: 'POST',
  handler: fleetController.explorePlanet
}

// TODO: implement get fleet fleets
// const getPlayerFleetsRoute: Route = {
//   url: FLEET_PATH,
//   method: 'GET',
//   handler: fleetController.getPlayerFleets
// }

const fleetRoutes = [explorePlanetRoute]

export default fleetRoutes
