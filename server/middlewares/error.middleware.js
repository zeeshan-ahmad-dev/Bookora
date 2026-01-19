export const errorHandler = (err, req, res, next) => {
  const statusCode = err.status || 500;
  console.log(err)

  res
    .status(statusCode)
    .json({ success: false, message: err.message || "Internal Server Error" });
};
