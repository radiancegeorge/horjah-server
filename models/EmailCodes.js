const EmailCodes = (sequelize, DataTypes) => {
  const EmailCodes = sequelize.define("EmailCodes", {
    code: { type: DataTypes.STRING, allowNull: false },
  });

  EmailCodes.associate = (models) => {
    EmailCodes.belongsTo(models.EmailStatus, {
      onDelete: "cascade",
      foreignKey: {
        allowNull: false,
        unique: "emailStatus",
      },
    });
  };
  return EmailCodes;
};

module.exports = EmailCodes;
