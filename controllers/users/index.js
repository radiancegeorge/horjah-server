require("dotenv").config();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const { Users } = require("../../models");
const { Op } = require("sequelize");
const genOTP = require("../../utils/genOTP");
const sendMail = require("../../utils/sendMail");
const { hashPassword } = require("../../utils/hashPassword");
const { sign } = require("../../utils/jwt");
//required parameters
// first_name, last_name, email, password, tel
const registration = asyncHandler(async (req, res, next) => {
  const { password, email, tel } = req.body;
  const data = {};
  let message;
  try {
    const user = await Users.findOne({
      where: {
        [Op.or]: [{ email }, { tel }],
      },
    });
    const setMessage = (text) => {
      message = text;
      console.log(user.dataValues);
      throw message;
    };
    user &&
      user.dataValues &&
      user.dataValues.email &&
      setMessage("email or phone number already exists");
    data.hashedPassword = await hashPassword(password);
    Users.create({ ...req.body, password: data.hashedPassword });
    res
      .status(200)
      .json({ message: "successfully registered", ...req.body, password: "" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
});

//required params
//email, password
const login = asyncHandler(async (req, res, next) => {
  const { password, email } = req.body;
  const data = {};
  try {
    const user = await Users.findOne({
      where: {
        email,
      },
    });
    if (!user) throw "No such user";
    const isUser = await bcrypt.compare(password, user.dataValues.password);
    if (!isUser) throw "invalid password, please try again";

    //generate token
    const token = await sign(user);

    isUser &&
      res
        .status(200)
        .json({ message: "success", ...user.dataValues, token, password: "" });
  } catch (error) {
    res.status(401).json({ error });
  }
});

const requestPasswordReset = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  const otp = genOTP();
  const message = `
        You have requested to change ur password <br>
        otp: ${otp}
    `;
  try {
    const isEmail = await Users.findOne({
      where: {
        email,
      },
    });
    console.log(isEmail);
    if (!isEmail) throw { error: "No such mail found" };
    const mailStatus = await sendMail(message, email, process.env.reset_email);
    mailStatus && res.status(200).json({ message: "success", otp });
  } catch (error) {
    res.status(500).json({ error });
  }
});

const resetPassword = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  try {
    Users.update(
      {
        password: await hashPassword(password),
      },
      {
        where: { email },
      }
    );
    res.status(200).json({ message: "Password has been changed successfully" });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = {
  login,
  registration,
  requestPasswordReset,
  resetPassword,
};
