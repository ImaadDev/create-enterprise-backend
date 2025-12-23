import { generateTokens, verifyRefreshToken } from "./refresh.service.js";

export async function refreshController(request, reply) {
  const { refreshToken } = request.body || {};

  if (!refreshToken) {
    return reply.code(400).send({ message: "Refresh token required" });
  }

  if (!request.server.refreshStore.has(refreshToken)) {
    return reply.code(401).send({ message: "Invalid refresh token" });
  }

  try {
    const payload = verifyRefreshToken(refreshToken);

    // rotate token
    request.server.refreshStore.remove(refreshToken);

    const tokens = generateTokens({
      id: payload.id,
      email: payload.email,
      role: payload.role || "user"
    });

    request.server.refreshStore.add(tokens.refreshToken);

    reply.send(tokens);
  } catch {
    reply.code(401).send({ message: "Invalid refresh token" });
  }
}

export async function logoutController(request, reply) {
  const { refreshToken } = request.body || {};
  if (refreshToken) {
    request.server.refreshStore.remove(refreshToken);
  }

  reply.send({ message: "Logged out" });
}
