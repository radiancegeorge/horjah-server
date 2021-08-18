const Orders = (sequelize, DataTypes) => {
  return sequelize.define("Orders", {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    tel: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    zone: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    address: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    notes: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    delivered_status: {
      allowNull: false,
      type: DataTypes.ENUM(1, 2),
      defaultValue: 1,
    },
    total_price: {
      allowNull: false,
      type: DataTypes.DECIMAL,
    },
    list: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
  });
};
module.exports = Orders;
