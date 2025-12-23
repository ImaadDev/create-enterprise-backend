import { loginUser, getMe } from "./auth.service.js";

// OPTIONAL refresh extension
let attachRefresh = null;
try {
  ({ attachRefresh } = await import("./refresh.attach.js"));
} catch {
  // refresh-token feature not installed → ignore
}

export async function loginController(request, reply) {
  const { email, password } = request.body;

  try {
    let result = await loginUser({ email, password });

    // 🔑 attach refresh token only if feature exists
    if (attachRefresh) {
      result = attachRefresh(result, request);
    }

    reply.send(result);
  } catch (err) {
    reply.code(401).send({ message: err.message });
  }
}


/**
 * GET /api/auth/me
 */
export async function meController(request, reply) {
  reply.send(request.auth);
}
