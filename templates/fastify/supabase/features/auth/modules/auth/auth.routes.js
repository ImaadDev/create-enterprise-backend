import { loginController, meController } from "./auth.controller.js";

export default async function authRoutes(fastify) {
  fastify.post("/login", loginController);

  fastify.get(
    "/me",
    { preHandler: fastify.authenticate },
    meController
  );
}
