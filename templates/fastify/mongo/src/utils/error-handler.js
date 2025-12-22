export function globalErrorHandler(error, request, reply) {
  // Log full error (for dev / prod logs)
  request.log.error(error);

  // Default values
  const statusCode = error.statusCode || 500;
  const message =
    statusCode === 500
      ? "Internal Server Error"
      : error.message;

  reply.code(statusCode).send({
    statusCode,
    message,
    path: request.url,
    timestamp: new Date().toISOString()
  });
}
