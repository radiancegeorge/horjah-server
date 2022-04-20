const express = require("express");
const {
  createCategory,
  removeCategory,
  getAllCategories,
  addProducts,
  getProduct,
  removeProducts,
} = require("../controllers/products");
const products = express.Router();
const fileUpload = require("express-fileupload");
const protect = require("../middlewares/auth.middleware");
products.use(fileUpload());

products.post("/createCategory", createCategory);
products.delete("/removeCategory", removeCategory);
products.get("/categories", getAllCategories);
products.post("/add", addProducts);
products.get("/", getProduct);
products.delete("/deleteProduct", removeProducts);
module.exports = products;
