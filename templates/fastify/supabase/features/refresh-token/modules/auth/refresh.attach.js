import { generateTokens } from "./refresh.service.js";

/**
 * Attach refresh token to login result
 * (only when refresh-token feature exists)
 */
export function attachRefresh(loginResult, request) {
  const tokens = generateTokens({
    id: loginResult.user.id,
    email: loginResult.user.email,
    role: loginResult.user.role
  });

  // store refresh token (session)
  request.server.refreshStore.add(tokens.refreshToken);

  return {
    ...loginResult,
    accessToken: tokens.accessToken, // override access token
    refreshToken: tokens.refreshToken
  };
}
