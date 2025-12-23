import {
  refreshController,
  logoutController,
  logoutAllController
} from "./refresh.controller.js";

export default async function refreshRoutes(fastify) {
  fastify.post("/refresh", refreshController);
  fastify.post("/logout", logoutController);

  // 🔐 logout-all MUST be protected
  fastify.post(
    "/logout-all",
    { preHandler: fastify.authenticate },
    logoutAllController
  );
}
