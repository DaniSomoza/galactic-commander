import Server from 'auth-microservice/src/configuration/Server'
import authRoutes from 'auth-microservice/src/routes/authRoutes'
import connectToDatabase from 'auth-microservice/src/configuration/Database'

const { FRONTEND_ORIGIN } = process.env

async function main() {
  await connectToDatabase()

  const serverOptions = { logger: true }
  const origins = [String(FRONTEND_ORIGIN)]
  const authServer = new Server(serverOptions)

  authServer.configureCors(origins)
  authServer.addRoutes(authRoutes)

  const port = 3_000
  const host = '0.0.0.0'

  authServer.start(host, port)
}

main()
