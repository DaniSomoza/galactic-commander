import { Route } from "../configuration/Server";
import userController from "../controllers/userController";

// TODO: configure relative imports with alias
// TODO: add rule to the prettier

export const USER_PATH = "/user";
export const ACTIVATE_USER_PATH = "/activate-user";

const createUserRoute: Route = {
  url: USER_PATH,
  method: "POST",
  handler: userController.createUser,
};

// TODO: create user routes

const userRoutes = [createUserRoute];

export default userRoutes;
