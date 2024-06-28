const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode ? res.statusCode : 500;
  let message = err.message ? err.message : "Internal Server Error";

  if (err.name === "CastError" || err.stack === "ObjectId") {
    statusCode = 404;
    message = "Resource not found";
  }

  res.status(statusCode);
  res.json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
    status: statusCode,
  });
};

export { notFound, errorHandler };
