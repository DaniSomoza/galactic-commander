import { Route } from "../configuration/Server";
import User from "../models/User";

let testCounter = 8;

const testRoute: Route = {
  url: "/user",
  method: "get",
  handler: async (request, reply) => {
    testCounter++;

    const myNewUser = new User({
      username: "testUser" + testCounter,
      email: `user-test-kjshdf${testCounter}@yopmail.com`,
      password: "1234",
      activationCode: "8888",
    });

    await myNewUser.save();

    reply.send({ hello: "world! " + testCounter });
  },
};

// TODO: create user routes

const userRoutes = [testRoute];

export default userRoutes;
