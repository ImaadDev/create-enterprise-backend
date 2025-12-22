import fp from "fastify-plugin";
import jwt from "@fastify/jwt";

export default fp(async (app, opts) => {
  app.register(jwt, {
    secret: opts.secret
  });
});
