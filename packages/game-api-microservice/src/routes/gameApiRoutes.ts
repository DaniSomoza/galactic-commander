import playerRoutes from './playerRoutes'
import researchRoutes from './researchRoutes'
import gameInfoRoutes from './gameInfoRoutes'
import taskRoutes from './taskRoutes'

const gameApiRoutes = [...playerRoutes, ...researchRoutes, ...gameInfoRoutes, ...taskRoutes]

export default gameApiRoutes
