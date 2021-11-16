const handleError = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({ error: err });
};

module.exports = handleError;
