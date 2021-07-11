const express = require("express");
const { createCategory, removeCategory } = require("../controllers/products");
const products = express.Router();

products.post('/createCategory', createCategory);
products.post('/removeCategory', removeCategory);

module.exports = products;