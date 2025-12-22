export async function requireAuth(request, reply) {
  try {
    await request.jwtVerify();
  } catch (err) {
    reply.code(401).send({
      statusCode: 401,
      message: "Unauthorized: Invalid or missing token"
    });
  }
}
