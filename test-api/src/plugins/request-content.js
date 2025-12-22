import fp from "fastify-plugin";
import { supabasePublic } from "../config/supabase.js";

export default fp(async (app) => {
  app.decorateRequest("user", null);

  app.addHook("preHandler", async (req) => {
    const auth = req.headers.authorization;
    if (!auth?.startsWith("Bearer ")) return;

    const token = auth.split(" ")[1];
    const { data } = await supabasePublic.auth.getUser(token);

    req.user = data?.user || null;
  });
});
