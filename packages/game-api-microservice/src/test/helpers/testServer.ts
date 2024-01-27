import Server from '../../configuration/Server'
import gameApiRoutes from '../../routes/gameApiRoutes'

// initialize server
const serverOptions = {
  logger: false
}

export const testServer = new Server(serverOptions)
testServer.addRoutes(gameApiRoutes)
testServer.configureCors(['http://localhost:3000'])

export default () => {
  const port = 3_000
  const host = '0.0.0.0'
  testServer.start(host, port)
}
