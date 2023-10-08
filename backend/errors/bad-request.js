const CustomAPIErrors = require("./customErrors");
const { StatusCodes } = require("http-status-codes");

class BadRequestError extends CustomAPIErrors {
  constructor(message) {
    super(message);
    this.statusCodes = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
