const { Op } = require('sequelize');
const { Products, Categories } = require('../models')
const createProducts = async ({
    name,
    category,
    unit,
    image,
    price
}) => {
    //check if category exists before proceed!
    const categ = await Categories.findOne({
        where: {
            category
        }
    });
    console.log(categ)
    if(categ){
        const isAdded = await Products.create({
            name,
            category,
            unit,
            image,
            price
        });
        return isAdded
    }
    if(!categ) throw "No such category exists";
};

const getProducts = async ({
    category,
    name,
    id
}) => {
    if(category){
        return await Products.findAll({
            where: {
                category: {
                    [Op.like]: `%${category}%`
                }
            }
        });
    }
    if(name){
        return await Products.findAll({
            where: {
                name: {
                    [Op.like]: `%${name}%`
                }
            }
        });
    }
    if(id){
        return await Products.findOne(
            {
                where: {
                    id
                }
            }
        )
    }
    if(!name && !category){
        return await Products.findAll();
    }
}
const deleteProduct = async(id)=>{
   if(!id) throw new Error("ID cannot be empty");
   const isDeleted = await Products.destroy(
       {
           where: {
               id
           }
       }
   );
   return isDeleted;
};
module.exports = Object.freeze({
    createProducts,
    getProducts,
    deleteProduct
})