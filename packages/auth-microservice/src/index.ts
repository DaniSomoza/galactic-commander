import Server from './configuration/Server'
import authRoutes from './routes/authRoutes'
import connectToDatabase from './configuration/Database'
import getFrontendOrigins from './utils/getFrontendOrigins'

async function main() {
  await connectToDatabase()

  const serverOptions = { logger: true }
  const origins = getFrontendOrigins()
  const authServer = new Server(serverOptions)

  authServer.configureCors(origins)
  authServer.addRoutes(authRoutes)

  const port = 3_000
  const host = '0.0.0.0'

  authServer.start(host, port)
}

main()
