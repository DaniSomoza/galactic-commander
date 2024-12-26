import playerRoutes from './playerRoutes'
import researchRoutes from './researchRoutes'
import buildUnitsRoutes from './buildUnitsRoutes'
import gameInfoRoutes from './gameInfoRoutes'
import taskRoutes from './taskRoutes'
import galaxyRoutes from './galaxyRoutes'

// TODO: fleets endpoints

const gameApiRoutes = [
  ...playerRoutes,
  ...researchRoutes,
  ...buildUnitsRoutes,
  ...gameInfoRoutes,
  ...taskRoutes,
  ...galaxyRoutes
]

export default gameApiRoutes
