const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors/customErrors");

const errorHandlerMiddleware = (err, req, res, next) => {
  // this is to handle error that we throw
  console.log(err);
  let customError = {
    statusCodes: err.statusCodes || StatusCodes.INTERNAL_SERVER_ERROR,
    msg: err.message || "Something went wrong",
  };
  // this is to handle error throw by mongoose
  if (err.name === "ValidationError") {
    customError.msg = Object.values(err.errors)
      .map((item) => item.message)
      .join(", ");
    customError.statusCodes = StatusCodes.BAD_REQUEST;
  }
  if (err.code && err.code === 11000) {
    customError.msg = `This ${Object.keys(err.keyValue)} already exists, `;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.name === "ValidationError") {
    customError.msg = `${err.message.includes("password") ? "Password, " : ""}${
      err.message.includes("name") ? "Name " : ""
    }length is too short`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  return res.status(customError.statusCodes).json({ msg: customError.msg });
};

module.exports = errorHandlerMiddleware;
