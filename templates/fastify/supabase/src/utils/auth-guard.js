import { supabasePublic } from "../config/supabase.js";

export async function requireAuth(request, reply) {
  if (!supabasePublic) {
    return reply.code(503).send({
      message: "Auth service not configured (Supabase disabled)"
    });
  }

  const auth = request.headers.authorization;

  if (!auth || !auth.startsWith("Bearer ")) {
    return reply.code(401).send({ message: "Unauthorized" });
  }

  const token = auth.split(" ")[1];

  const { data, error } = await supabasePublic.auth.getUser(token);

  if (error || !data?.user) {
    return reply.code(401).send({
      message: "Invalid or expired token"
    });
  }

  request.user = data.user;
}
