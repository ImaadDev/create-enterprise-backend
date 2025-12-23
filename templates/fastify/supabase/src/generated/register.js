// AUTO-GENERATED - DO NOT EDIT
export async function registerGenerated(app) {

  const authPlugin = (await import("../plugins/auth.js")).default;
  const authRoutes = (await import("../modules/auth/auth.routes.js")).default;

  await app.register(authPlugin);
  await app.register(authRoutes, { prefix: "/api/auth" });

  const refreshStore = (await import("../plugins/refresh-store.js")).default;
  const refreshRoutes = (await import("../modules/auth/refresh.routes.js")).default;

  await app.register(refreshStore);
  await app.register(refreshRoutes, { prefix: "/api/auth" });

}
