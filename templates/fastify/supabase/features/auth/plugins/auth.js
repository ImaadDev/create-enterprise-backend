

import jwt from "jsonwebtoken";

export default async function authPlugin(fastify) {
  // decorate request with auth payload
  fastify.decorateRequest("auth", null);

  // authentication middleware
  fastify.decorate("authenticate", async (request, reply) => {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return reply.code(401).send({ message: "Unauthorized" });
    }

    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      request.auth = decoded; // { id, email, role, iat, exp }
    } catch (err) {
      return reply.code(401).send({ message: "Invalid token" });
    }
  });
}

