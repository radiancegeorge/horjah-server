const asyncHandler = require('express-async-handler');
const { deleteCategory, addCategory, getCategories } = require('../../utils/handleCategory');

const removeCategory = asyncHandler(async (req, res, next) => {
    const {id} = req.body;
    try{
        const data = await deleteCategory(id);
        res.status(200).json({message: "succcess", categories: data});
    }catch(error){
        res.status(500).json({error})
    }
});

const createCategory = asyncHandler(async (req, res, next)=>{
    const {name} = req.body;
    try{
        const data = await addCategory(name);
        res.status(200).json({message: "success", categories: data});
    }catch(error){
        res.status(500).json({error})
    }
});
const getAllCategories = asyncHandler(async(req, res,next) =>{
    try{
        const categories = await getCategories();
        res.status(200).json({
            message:"success",
            categories
        })
    }catch(error){
        res.status(500).json({error})
    }
})
module.exports = {
    removeCategory,
    createCategory,
    getAllCategories
}
