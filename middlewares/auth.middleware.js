const { verify } = require("../utils/jwt");

const protect = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    req.user = await verify(authorization);
    if (!req.user) throw "invalid token";
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid Token",
    });
  }
};

module.exports = protect;
