require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { UnauthenticatedError } = require("../errors/index");

const auth = async (req, res, next) => {
  const token = req.cookies.accessToken;
  console.log("Inside of auth middleware");
  if (!token) {
    throw new UnauthenticatedError("Authentication failed");
  }
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: payload.userId, name: payload.name };
    next();
  } catch (err) {
    console.log("Inside of auth middleware catch block" + err);
    throw new UnauthenticatedError("Authentication Invalid");
  }
};

module.exports = auth;
