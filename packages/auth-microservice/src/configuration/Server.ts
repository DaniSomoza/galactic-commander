import Fastify, { RouteOptions } from "fastify";

class Server {
  server;

  constructor(serverOptions: ServerOptions) {
    this.server = Fastify(serverOptions);
  }

  start(host: string, port: number) {
    this.server.listen({ host, port });
  }

  configureCors(origins: string[]) {
    // TODO: implement CORS
  }

  addRoutes(routes: RouteOptions[]) {
    routes.map((route) => {
      this.server.route(route);
    });
  }
}

type ServerOptions = {
  logger: boolean;
};

export type Route = RouteOptions;

export default Server;
