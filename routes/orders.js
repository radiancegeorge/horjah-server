const express = require("express");
const {
  fetchOrders,
  addToOrder,
  fetchById,
  changeDeliveryStatus,
} = require("../controllers/orders");
const adminProtect = require("../middlewares/admin.auth.middleware");
const protect = require("../middlewares/auth.middleware");
const allOrders = express.Router();

allOrders.get("/getById", adminProtect, fetchById);
allOrders.get("/:field", adminProtect, fetchOrders).post("/", addToOrder);
allOrders.post("/toggleDeliveryStatus", adminProtect, changeDeliveryStatus);
module.exports = allOrders;
