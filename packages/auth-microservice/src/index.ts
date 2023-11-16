import Server from "./configuration/Server";
import routes from "./routes/routes";
import initializeDatabase from "./configuration/Database";

const { FRONTEND_ORIGIN } = process.env;

async function main() {
  await initializeDatabase();

  const serverOptions = { logger: true };
  const server = new Server(serverOptions);
  const origins = [String(FRONTEND_ORIGIN)];

  server.configureCors(origins);
  server.addRoutes(routes);

  const port = 3_000;
  const host = "0.0.0.0";

  server.start(host, port);
}

main();
