export const errorMiddleware = (err, req, res, next) => {
  debugLog("Error:" + err);
  res.status(500).json({
    message: err.message,
  });
};
