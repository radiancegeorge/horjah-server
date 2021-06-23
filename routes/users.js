const express = require('express');
const { registration, login } = require('../controllers/users');
const user = express.Router()

user.post('/register', registration);
user.post("/login", login)

module.exports = user;