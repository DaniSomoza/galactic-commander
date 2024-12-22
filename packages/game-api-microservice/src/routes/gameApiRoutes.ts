import playerRoutes from './playerRoutes'
import researchRoutes from './researchRoutes'
import buildUnitsRoutes from './buildUnitsRoutes'
import gameInfoRoutes from './gameInfoRoutes'
import taskRoutes from './taskRoutes'

const gameApiRoutes = [
  ...playerRoutes,
  ...researchRoutes,
  ...buildUnitsRoutes,
  ...gameInfoRoutes,
  ...taskRoutes
]

export default gameApiRoutes
