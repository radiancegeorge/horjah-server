const {Categories} = require("../models");

const addCategory = async (categoryName)=>{

    const isExist = await Categories.findOne({
        where: {
            category: categoryName
        }
    });
    if(isExist) throw "category already exists!";

    Categories.create({
        category: categoryName.toLowerCase()
    });
    return await Categories.findAll();
}

const deleteCategory = async (id) =>{
    Categories.destroy({
        where: {
            id 
        }
    })
    return await Categories.findAll();
}

const getCategories = async () =>{
    const data = await Categories.findAll();
    return data
}
module.exports = {
    addCategory,
    deleteCategory,
    getCategories
}