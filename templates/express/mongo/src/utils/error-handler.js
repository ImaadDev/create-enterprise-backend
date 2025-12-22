export function globalErrorHandler(err, req, res, next) {
  console.error(err);

  res.status(err.statusCode || 500).json({
    statusCode: err.statusCode || 500,
    message: err.message || "Internal Server Error",
    path: req.originalUrl,
    timestamp: new Date().toISOString()
  });
}
