const asyncHandler = require("express-async-handler");
const {
  registerOrders,
  orders,
  pendingOrders,
  deliveredOrders,
} = require("../../utils/registerOrders");

const addToOrder = asyncHandler(async (req, res, next) => {
  const data = req.body;
  try {
    const isRegistered = await registerOrders(data);
    if (isRegistered)
      res.status(200).json({
        message: "success",
        data: isRegistered,
      });
    if (!isRegistered)
      res.status(500).json({
        message: "an error is registering orders",
      });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
});

const fetchOrders = asyncHandler(async (req, res, next) => {
  try {
    const { field } = req.params;
    const { id, ...filterObject } = req.body;
    // console.log(filterObject, req.body);
    if (field === "all") {
      const ordersData = await orders();
      res.status(200).json({
        message: "success",
        data: ordersData,
      });
      return;
    }
    if (field === "delivered") {
      const ordersData = await deliveredOrders({ ...filterObject });
      res.status(200).json({
        message: "success",
        data: ordersData,
      });
      return;
    }
    if (field === "pending") {
      const ordersData = await pendingOrders({ ...filterObject });
      res.status(200).json({
        message: "success",
        data: ordersData,
      });
      return;
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});
const fetchById = asyncHandler(async (req, res, next) => {
  const { id } = req.body;
  try {
    const ordersData = await orders(id);
    res.status(200).json({
      message: "success",
      data: ordersData,
    });
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});
module.exports = {
  addToOrder,
  fetchOrders,
  fetchById,
};
