const { sendResponse } = require("../Helpers/helpers.commonFunc");
const jwt = require('jsonwebtoken');
const Config = require("../Configs/Config.json");
const verifyUserMiddleware = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        sendResponse(res, null, 401, false, "Token not found");
        return
    } else {
        try {
            const decoded = jwt.verify(token, Config.KEY);
            if (!decoded) {
                sendResponse(res, null, 401, false, "Unauthorized Token");
                return
            } else {
                req.user = decoded.user;
                if (!decoded.isVerified) {
                    sendResponse(res, null, 401, false, "Invalid Token");
                    return
                } else {
                    next();
                }
            }
        } catch (err) {
            sendResponse(res, null, 401, false, "Unauthorized Token");
            return
        }
    }
}

const verifytUserOtpMiddleware = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        sendResponse(res, null, 401, false, "Token not found");
        return
    } else {
        try {
            const decoded = jwt.verify(token, Config.KEY);
            if (!decoded) {
                sendResponse(res, null, 401, false, "Unauthorized Token");
                return
            } else {
                req.user = decoded.user;
                if (!req.user?.isVerified) {
                    next();
                } else {
                    sendResponse(res, null, 401, false, "Invalid Token");
                    return
                }
            }
        } catch (err) {
            sendResponse(res, null, 401, false, "Unauthorized Token");
            return
        }
    }
}

module.exports = {
    verifyUserMiddleware,
    verifytUserOtpMiddleware
}