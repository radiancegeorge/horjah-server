const { Op } = require("sequelize");
const { Products, Categories } = require("../models");
const createProducts = async ({
  name,
  category,
  unit,
  image,
  price,
  weight,
}) => {
  //check if category exists before proceed!
  const categ = await Categories.findOne({
    where: {
      category,
    },
  });
  console.log(categ);
  if (categ) {
    const isAdded = await Products.create({
      name,
      category,
      unit,
      image,
      price,
      weight,
    });
    return isAdded;
  }
  if (!categ) throw "No such category exists";
};

const getProducts = async (data) => {
  const {
    category,
    name,
    id,
    limit = 10,
    page = 1,
    price_start,
    price_end,
  } = data;
  const offset = (page - 1) * limit;

  const productsCount = await Products.count({
    where: {
      ...(name && { name }),
      ...(id && { id }),
      ...(category && { category }),
      ...(price_start &&
        price_end && {
          price: {
            [Op.between]:
              Number(price_start) < Number(price_end)
                ? [Number(price_start), Number(price_end)]
                : [Number(price_end), Number(price_start)],
          },
        }),
    },
  });
  const totalPages = Math.ceil(productsCount / limit);
  const product = await Products.findAll({
    where: {
      ...(category && { category }),
      ...(name && { name }),
      ...(id && { id }),
      ...(price_start &&
        price_end && {
          price: {
            [Op.between]:
              Number(price_start) < Number(price_end)
                ? [Number(price_start), Number(price_end)]
                : [Number(price_end), Number(price_start)],
          },
        }),
    },
    limit,
    offset,
    order: [["id", "desc"]],
  });

  return {
    product,
    productsCount,
    currentPage: Number(page),
    totalPages,
  };
};
const deleteProduct = async (id) => {
  if (!id) throw "ID cannot be empty";
  const isDeleted = await Products.destroy({
    where: {
      id,
    },
  });
  return isDeleted;
};
module.exports = Object.freeze({
  createProducts,
  getProducts,
  deleteProduct,
});
