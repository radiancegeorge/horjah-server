module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    first_name: {
      unique: false,
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      unique: false,
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    tel: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
  });
  Users.associate = (models) => {
    Users.hasMany(models.Orders);
    Users.hasOne(models.EmailStatus, {
      foreignKey: {
        allowNull: false,
        unique: "userId",
      },
    });
  };

  return Users;
};
