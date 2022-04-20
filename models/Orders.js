const Orders = (sequelize, DataTypes) => {
  const Orders = sequelize.define("Orders", {
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
      type: DataTypes.ENUM("1", "2"),
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
    reference: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });
  Orders.associate = (models) => {
    Orders.belongsTo(models.Users);
  };
  return Orders;
};
module.exports = Orders;
