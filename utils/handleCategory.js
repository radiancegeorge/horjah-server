const { Categories, Products } = require("../models");

const addCategory = async (categoryName) => {
  const isExist = await Categories.findOne({
    where: {
      category: categoryName,
    },
  });
  if (isExist) throw "category already exists!";

  await Categories.create({
    category: categoryName.toLowerCase(),
  });
  return await getCategories();
};

const deleteCategory = async (id) => {
  const { category } = await Categories.findOne({
    where: { id },
  });
  console.log(category, "to be deleted");
  await Categories.destroy({
    where: {
      id,
    },
  });

  await Products.destroy({
    where: {
      category,
    },
  });
  return await Categories.findAll();
};

const getCategories = async () => {
  const data = await Categories.findAll();
  return data;
};
module.exports = {
  addCategory,
  deleteCategory,
  getCategories,
};
