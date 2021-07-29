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
    name
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
    if(!name && !category){
        return await Products.findAll();
    }
}
module.exports = Object.freeze({
    createProducts,
    getProducts
})