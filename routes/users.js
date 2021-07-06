const express = require('express');
const { registration, login, requestPasswordReset, resetPassword } = require('../controllers/users');
const user = express.Router()

user.post('/register', registration);
user.post("/login", login)
user.post('/requestPasswordReset', requestPasswordReset)
user.post('/resetPassword', resetPassword);
module.exports = user;