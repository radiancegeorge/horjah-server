const express = require("express");
const { fetchOrders, addToOrder, fetchById } = require("../controllers/orders");
const allOrders = express.Router();

allOrders.get("/getById", fetchById);
allOrders.get("/:field", fetchOrders).post("/", addToOrder);

module.exports = allOrders;
