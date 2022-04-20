require("dotenv").config();
const adminProtect = (req, res, next) => {
  req.user.email === process.env.admin_email
    ? next()
    : res.status(401).json({ error: "invalid token" });
};

module.exports = adminProtect;
