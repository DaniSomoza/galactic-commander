import { Route } from '../configuration/Server'
import playerRoutes from './playerRoutes'
import researchRoutes from './researchRoutes'
import buildUnitsRoutes from './buildUnitsRoutes'
import gameInfoRoutes from './gameInfoRoutes'
import taskRoutes from './taskRoutes'
import galaxyRoutes from './galaxyRoutes'
import fleetRoutes from './FleetRoutes'

const gameApiRoutes: Route[] = [
  ...playerRoutes,
  ...researchRoutes,
  ...buildUnitsRoutes,
  ...gameInfoRoutes,
  ...taskRoutes,
  ...galaxyRoutes,
  ...fleetRoutes
]

export default gameApiRoutes
