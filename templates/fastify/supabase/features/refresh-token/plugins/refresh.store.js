import fp from "fastify-plugin";

export default fp(async function refreshStore(fastify) {
  const store = new Set();

  fastify.decorate("refreshStore", {
    add: (token) => store.add(token),
    has: (token) => store.has(token),
    remove: (token) => store.delete(token)
  });
});
