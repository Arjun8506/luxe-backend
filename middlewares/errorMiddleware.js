const errorHandler = (err, req, res, next) => {
  if (!err) {
    return res.status(500).json({
      status: "error",
      message: "Unknown error occurred",
    });
  }

  const statusCode = err.statusCode || 500;
  const message = err.isOperational
    ? err.message
    : "Something went wrong. Please try again later.";

  return res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};

module.exports = errorHandler;
