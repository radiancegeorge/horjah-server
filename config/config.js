require("dotenv").config();
module.exports = {
  development: {
    dialect: "sqlite",
    storage: "./database.db",
  },
  test: {
    username: "root",
    password: "radiance7",
    database: "horjah",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: process.env.db_user,
    password: process.env.db_password,
    database: process.env.database,
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
