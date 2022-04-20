require("dotenv").config();
const jwt = require("jsonwebtoken");
const { Users } = require("../models");

module.exports.sign = async ({ id, email, first_name }) => {
  try {
    const signed = jwt.sign(
      {
        id,
        email,
        first_name,
      },
      process.env.jwtKey,
      {
        expiresIn: 1000 * 60 * 60 * 24 * 30,
      }
    );
    return signed;
  } catch (error) {
    return null;
  }
};

module.exports.verify = async (string) => {
  try {
    const token = string.split(" ")[1];
    const data = jwt.verify(token, process.env.jwtKey);
    const user = await Users.findOne({
      where: {
        id: data.id,
      },
    });
    if (user) return user;
  } catch (error) {
    return null;
  }
};
