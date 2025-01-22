require('dotenv').config();
const jwt = require('jsonwebtoken');
const logger = require('./loggerFunction');

// Utility function to send response
const sendResponse = (res, error = null, statusCode = 500, success = false, message = "internal server error", data = undefined) => {
    if (error) {
        logger.error(error);
    }
    res.status(statusCode).json({
        success,
        message,
        data,
    });
};

// Function to generate an OTP of specified length
const generateOTP = (length = 6) => {
    const digits = '0123456789';
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
};

// Function to generate a JWT token
const generateToken = async (body, key = process.env.JWT_SECRET_KEY, expiry = 60 * 60 * 72) => {
    console.log("JWT_SECRET_KEY:", key);
    if (!key) {
        throw new Error('JWT_SECRET_KEY is not defined in environment variables.');
    }
    const accessToken = jwt.sign(body, key, { expiresIn: expiry });
    return accessToken;
};

module.exports = {
    sendResponse,
    generateToken,
    generateOTP
};
