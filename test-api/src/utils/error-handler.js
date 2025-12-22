export function globalErrorHandler(error, request, reply) {
  request.log.error(error);

  reply.code(error.statusCode || 500).send({
    statusCode: error.statusCode || 500,
    message: error.message || "Internal Server Error",
    path: request.url,
    timestamp: new Date().toISOString()
  });
}
