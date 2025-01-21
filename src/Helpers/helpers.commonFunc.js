const jwt = require('jsonwebtoken');
const Config = require("../Configs/Config.json");
const logger = require('./loggerFunction');
const sendResponse = (res, error = null, statusCode = 500, success = false, message = "internal server error", data = undefined) => {
    if (error) {
        logger.error(error);
    }
    res.status(statusCode).json(
        {
            success,
            message,
            data,
        }
    )
}

const generateOTP = (length = 6) => {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
};

const generateToken = async (body, key = Config.KEY, expiry = 60 * 60 * 72) => {
    if (key === undefined || key === null) {
        key = Config.KEY;
    }
    const accessToken = jwt.sign(
        body,
        key,
        {
            expiresIn: expiry,
            // 60 * 60 * 72
        }
    );
    return accessToken
}

module.exports = {
    sendResponse,
    generateToken,
    generateOTP
};