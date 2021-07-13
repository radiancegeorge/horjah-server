const express = require("express");
const { createCategory, removeCategory, getAllCategories } = require("../controllers/products");
const products = express.Router();

products.post('/createCategory', createCategory);
products.post('/removeCategory', removeCategory);
products.get('/categories', getAllCategories)

module.exports = products;