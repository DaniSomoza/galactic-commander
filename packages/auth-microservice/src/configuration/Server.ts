import Fastify, { RouteOptions } from 'fastify'
import cors from '@fastify/cors'

// this line is to test the linter action
const testLint = 'this var is to test the linter action'

class Server {
  server

  constructor(serverOptions: ServerOptions) {
    this.server = Fastify(serverOptions)
  }

  start(host: string, port: number) {
    this.server.listen({ host, port })
  }

  configureCors(origins: string[]) {
    this.server.register(cors, {
      origin: origins,
      methods: ['GET', 'PUT', 'POST', 'DELETE']
    })
  }

  addRoutes(routes: RouteOptions[]) {
    routes.map((route) => {
      this.server.route(route)
    })
  }
}

type ServerOptions = {
  logger: boolean
}

export type Route = RouteOptions

export default Server
