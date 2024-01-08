import playerRoutes from '../routes/playerRoutes'
import researchRoutes from '../routes/researchRoutes'

const gameApiRoutes = [...playerRoutes, ...researchRoutes]

export default gameApiRoutes
