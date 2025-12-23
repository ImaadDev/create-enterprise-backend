import fp from "fastify-plugin";

export default fp(async function refreshStore(fastify) {
  // Map<userId, Set<refreshToken>>
  const store = new Map();

  fastify.decorate("refreshStore", {
    add(token, userId) {
      if (!store.has(userId)) {
        store.set(userId, new Set());
      }
      store.get(userId).add(token);
    },

    has(token) {
      for (const tokens of store.values()) {
        if (tokens.has(token)) return true;
      }
      return false;
    },

    remove(token) {
      for (const tokens of store.values()) {
        tokens.delete(token);
      }
    },

    removeAll(userId) {
      store.delete(userId);
    }
  });
});
