const CustomAPIErrors = require('./customErrors');
const {StatusCodes }= require('http-status-codes');

class UnauthenticatedError extends CustomAPIErrors {
    constructor(message){
        super(message);
        this.statusCodes = StatusCodes.NOT_FOUND;
    }
}

module.exports = UnauthenticatedError;