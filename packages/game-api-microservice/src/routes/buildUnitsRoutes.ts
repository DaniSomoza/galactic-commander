import buildUnitsController from '../controllers/buildUnitsController'
import { Route } from '../configuration/Server'

import { BUILD_UNITS_PATH, BUILD_UNITS_QUEUE_PATH } from './constants'

const startBuildUnitsRoute: Route = {
  url: BUILD_UNITS_PATH,
  method: 'POST',
  handler: buildUnitsController.startBuildUnits
}

const updateBuildUnitsQueue: Route = {
  url: BUILD_UNITS_QUEUE_PATH,
  method: 'POST',
  handler: buildUnitsController.updateBuildUnitsQueue
}

// TODO: implement cancel build units
// TODO: implement update/re-schedule build units task

const buildUnitsRoutes = [startBuildUnitsRoute, updateBuildUnitsQueue]

export default buildUnitsRoutes
