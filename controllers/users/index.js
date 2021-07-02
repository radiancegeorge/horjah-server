require('dotenv').config();
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const {Users} = require('../../models');
const {Op} = require("sequelize");


//required parameters 
// first_name, last_name, email, password, tel
const registration = asyncHandler(async (req, res, next) => {
    const {password, email, tel} = req.body;
    const data = {};
    let message;
    try{
        const user = await Users.findOne({
            attributes: ["email"]
        },{
            where: {
                [Op.or]: [{email},{tel}]
            }
        });

        if(user?.email){ 
            message = "email or phone number already exist";
            throw "err";
        }
        if(user?.tel){
            message = "phone number already exist";
            throw "err"
        }

        data.hashedPassword = await bcrypt.hash(password, Number(process.env.salt));
    }catch(err){
        res.status(500)
        throw new Error(message);
    };
    try{
        Users.create({...req.body, password: data.hashedPassword});
        res.status(200).json({message: "successfully registered", ...req.body, password: ""});
    }catch(err){
        res.status(500)
        throw new Error("Error creating User");
    };
});


//required params
//email, password
const login = asyncHandler( async (req, res, next)=>{
    const {password, email} = req.body;
    const data = {};
     try{
        data.user = await Users.findOne({
            attributes: ["id", "email", "first_name", "last_name", "password", "tel"]
        },{
            where: {
                email
            }
        })
     }catch(err){
         res.status(401)
         throw new Error("invalid username")
     }
     try{
        const isUser = await bcrypt.compare(password, data.user.password);
        isUser && res.status(200).json({message: "success", ...data.user.dataValues, password: ""});
        !isUser && res.status(401).json({message: "invalid password"});
     }catch(err){
         res.status(401)
         throw new Error(err.message);
     }
    
})


module.exports = {
    login,
    registration,
}