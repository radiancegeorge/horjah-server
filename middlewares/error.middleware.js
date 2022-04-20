const handleError = (err, req, res, next) => {
  res.status(err.statusCode || 500).json({ error: err });
  console.log(err);
};

module.exports = handleError;
