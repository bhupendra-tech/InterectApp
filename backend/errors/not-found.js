const CustomAPIErrors = require('./customErrors');
const {StatusCodes }= require('http-status-codes');

class NotFoundError extends CustomAPIErrors {
    constructor(message){
        super(message);
        this.statusCodes = StatusCodes.NOT_FOUND;
    }
}

module.exports = NotFoundError;