const express = require("express");
const {
  fetchOrders,
  addToOrder,
  fetchById,
  changeDeliveryStatus,
} = require("../controllers/orders");
const allOrders = express.Router();

allOrders.get("/getById", fetchById);
allOrders.get("/:field", fetchOrders).post("/", addToOrder);
allOrders.post("/toggleDeliveryStatus", changeDeliveryStatus);
module.exports = allOrders;
