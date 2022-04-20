const EmailStatus = (sequelize, DataTypes) => {
  const EmailStatus = sequelize.define("EmailStatus", {
    status: {
      type: DataTypes.ENUM("0", "1", "2"),
      allowNull: false,
      defaultValue: "0",
    },
  });
  EmailStatus.associate = (models) => {
    EmailStatus.belongsTo(models.Users, {
      onDelete: "cascade",
      foreignKey: {
        allowNull: false,
        unique: "userId",
      },
    });
    EmailStatus.hasOne(models.EmailCodes, {
      foreignKey: {
        allowNull: false,
        unique: "emailStatus",
      },
    });
  };
  return EmailStatus;
};

module.exports = EmailStatus;
