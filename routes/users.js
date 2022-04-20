const express = require("express");
const {
  registration,
  login,
  requestPasswordReset,
  resetPassword,
  emailVerification,
  resendVerificationEmail,
} = require("../controllers/users");
const user = express.Router();

user.post("/register", registration);
user.post("/login", login);
user.post("/requestPasswordReset", requestPasswordReset);
user.post("/resetPassword", resetPassword);
user.get("/verify/:code", emailVerification);
user.post("/resend-verification-email", resendVerificationEmail);
module.exports = user;
