import { refreshController, logoutController } from "./refresh.controller.js";

export default async function refreshRoutes(fastify) {
  fastify.post("/refresh", refreshController);
  fastify.post("/logout", logoutController);
}
