// here we have login register controllers
const User = require("../models/user");
const { StatusCodes } = require("http-status-codes");
const { BadRequestError, UnauthenticatedError } = require("../errors/index");
const jwt = require("jsonwebtoken");
const register = async (req, res) => {
  const { userName, userEmail, userPassword } = req.body;
  const user = await User.create({
    name: userName,
    email: userEmail,
    password: userPassword,
  });
  const token = user.createJWT();
  // cookie syntax
  // res.cookie(name,value,[options]);
  res.status(StatusCodes.CREATED).cookie("accessToken", token, {
    httpOnly: true,
    maxAge: 2592000000,
  });
  res.redirect("/api/v1/user/dashboard");
};

const login = async (req, res) => {
  const { userEmail: email, userPassword: password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide email and password");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new UnauthenticatedError("Invalid Credentials ");
  }
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    throw new UnauthenticatedError("Invalid credentials");
  }
  const token = user.createJWT();
  res.status(StatusCodes.TEMPORARY_REDIRECT).cookie("accessToken", token, {
    httpOnly: true,
    maxAge: 2592000000,
  });
  res.redirect("/api/v1/user/dashboard");
};

module.exports = {
  login,
  register,
};
