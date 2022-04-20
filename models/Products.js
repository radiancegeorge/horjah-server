const Products = (sequelize, DataTypes) => {
  return sequelize.define("Products", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    unit: {
      allowNull: false,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    weight: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL(10, 2),
    },
  });
};
module.exports = Products;
