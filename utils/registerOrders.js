const { Orders } = require("../models");
const registerOrders = async (dataItems) => {
  const { name, tel, zone, address, list, total_price } = dataItems;

  [name, tel, zone, address, list, total_price].forEach((data) => {
    if (!data) throw `please fill all required field`;
  });
  const order = await Orders.create({ ...dataItems });
  if (order) return dataItems;
  if (!order) throw "An error occurred while taking orders!";
  console.log(order);
};

const pendingOrders = async ({
  order = "ASC",
  limit = 10,
  num = 1,
  getAll = false,
}) => {
  //get all pending orders
  if (getAll)
    return await Orders.findAll({
      where: {
        delivered_status: 1,
      },
    });

  const startingPoint = num * limit - limit;
  //   const endingPoint = num * limit;
  const orders = await Orders.findAll({
    where: {
      delivered_status: 1,
    },
    offset: startingPoint,
    limit,
    order: [["id", order]],
  });
  return orders;
};

const deliveredOrders = async ({
  order = "ASC",
  limit = 10,
  num = 1,
  getAll = false,
}) => {
  if (getAll)
    return await Orders.findAll({
      where: {
        delivered_status: 2,
      },
    });
  const startingPoint = num * limit - limit;
  //   const endingPoint = num * limit;
  const orders = await Orders.findAll({
    where: {
      delivered_status: 2,
    },
    offset: startingPoint,
    limit,
    order: [["id", order]],
  });
  return orders;
};
const orders = async (id) => {
  if (id)
    return await Orders.findOne({
      where: {
        id,
      },
    });
  return await Orders.findAll();
};
module.exports = {
  registerOrders,
  orders,
  deliveredOrders,
  pendingOrders,
};
