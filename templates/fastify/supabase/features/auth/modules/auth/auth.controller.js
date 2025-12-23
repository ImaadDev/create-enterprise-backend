import { loginUser, getMe } from "./auth.service.js";

/**
 * POST /api/auth/login
 */
export async function loginController(request, reply) {
  const { email, password } = request.body;

  if (!email || !password) {
    return reply.code(400).send({
      message: "Email and password are required"
    });
  }

  try {
    const result = await loginUser({ email, password });
    reply.send(result);
  } catch (err) {
    reply.code(401).send({
      message: err.message || "Invalid credentials"
    });
  }
}

/**
 * GET /api/auth/me
 */
export async function meController(request, reply) {
  reply.send(request.auth);
}
