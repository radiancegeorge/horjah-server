const asyncHandler = require('express-async-handler');
const fileUpload = require('express-fileupload');
const { deleteCategory, addCategory, getCategories } = require('../../utils/handleCategory');
const handleImage = require('../../utils/imageStore');
const { createProducts, getProducts } = require('../../utils/products');

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
});
const addProducts = asyncHandler(async(req, res, next) => {
    const {body} = req
    try{
        //handle file upload!
        const imageData = await handleImage(req.files);
        if(imageData){
            const data = {
                ...body,
                image: `/uploads/${imageData}`
            }
            const isCreated = await createProducts(data);
            if(isCreated) res.status(200).json({message: "successfully added products", data} )  ;
        }

    }catch(error){
        console.log(error);
        next(error);
    }
})
const getProduct = asyncHandler(async(req, res, next) => {
    const {body} = req;
    try{
        const product = await getProducts(body);
        res.status(200).json({
            message: "success",
            product
        });
    }catch(error){
        next(error);
    }
})
module.exports = {
    removeCategory,
    createCategory,
    getAllCategories,
    addProducts,
    getProduct
}
