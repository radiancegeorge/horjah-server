const express = require("express");
const { createCategory, removeCategory, getAllCategories, addProducts, getProduct } = require("../controllers/products");
const products = express.Router();
const fileUpload = require("express-fileupload");
products.use(fileUpload());

products.post('/createCategory', createCategory);
products.post('/removeCategory', removeCategory);
products.get('/categories', getAllCategories);
products.post('/add', addProducts);
products.get('/', getProduct);
module.exports = products;