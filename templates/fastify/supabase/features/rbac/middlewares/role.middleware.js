export const authorize =
  (roles = []) =>
  async (request, reply) => {
    if (!request.auth) {
      return reply.code(401).send({ message: "Unauthorized" });
    }

    if (!roles.includes(request.auth.role)) {
      return reply.code(403).send({ message: "Forbidden" });
    }
  };
