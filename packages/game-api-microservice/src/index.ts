import Server from './configuration/Server'
import gameApiRoutes from './routes/gameApiRoutes'
import connectToDatabase from './configuration/Database'
import getFrontendOrigins from './utils/getFrontendOrigins'

async function main() {
  await connectToDatabase()

  const serverOptions = { logger: true }
  const origins = getFrontendOrigins()
  const gameApiServer = new Server(serverOptions)

  gameApiServer.configureCors(origins)
  gameApiServer.addRoutes(gameApiRoutes)

  const port = 3_000
  const host = '0.0.0.0'

  gameApiServer.start(host, port)
}

main()
