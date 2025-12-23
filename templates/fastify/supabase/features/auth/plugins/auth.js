
import fp from "fastify-plugin";
import jwt from "jsonwebtoken";

export default fp(async function authPlugin(fastify) {
  fastify.decorateRequest("auth", null);

  fastify.decorate("authenticate", async (request, reply) => {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return reply.code(401).send({ message: "Unauthorized" });
    }

    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      request.auth = decoded;
    } catch {
      return reply.code(401).send({ message: "Invalid token" });
    }
  });
});


