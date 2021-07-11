
const Category = (sequelize, Datatypes)=>{
    return sequelize.define("Categories", {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: Datatypes.INTEGER
        },
        category: {
            type: Datatypes.STRING,
            unique: true,
            allowNull: false
        }
    })
} 
module.exports = Category;