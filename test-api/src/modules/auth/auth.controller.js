import { getCurrentUser } from "./auth.service.js";

export async function me(req, reply) {
  reply.send({
    user: getCurrentUser(req.user)
  });
}
