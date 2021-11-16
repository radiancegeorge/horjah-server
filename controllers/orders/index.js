const asyncHandler = require("express-async-handler");
const {
  registerOrders,
  orders,
  pendingOrders,
  deliveredOrders,
  toggleDeliveryStatus,
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
    const { id, ...filterObject } = req.query;
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
      const ordersData = await deliveredOrders({ id, ...filterObject });
      res.status(200).json({
        message: "success",
        data: ordersData,
      });
      return;
    }
    if (field === "pending") {
      const ordersData = await pendingOrders({ id, ...filterObject });
      res.status(200).json({
        message: "success",
        data: ordersData,
      });
      return;
    }
  } catch (error) {
    res.status(500).json({ error });
    console.log(error);
  }
});
const fetchById = asyncHandler(async (req, res, next) => {
  const { id } = req.query;
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
const changeDeliveryStatus = asyncHandler(async (req, res, next) => {
  try {
    const { id } = req.body;
    const data = await toggleDeliveryStatus(id);
    res.status(200).json({
      message: "success",
      data: data,
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
  changeDeliveryStatus,
};
