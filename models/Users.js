const Sequelize = require("sequelize")
module.exports = (sequelize, DataTypes)=>{
    return sequelize.define("Users", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER 
        },
        first_name:{
            unique: false,
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name:{
            unique: false,
            type: DataTypes.STRING,
            allowNull: false
        },
        email:{
            unique: true,
            type: DataTypes.STRING,
            allowNull: false
        },
        tel: {
            unique: true,
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING
        }
    })
}
