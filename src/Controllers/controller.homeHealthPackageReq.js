const { createHomeHealthCheckupDto, validateHomeHealthCheckupFields } = require("../DTOs/homeHealthCheckupReq.dto");
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const { createHomeHealthPackageReqServices } = require("../Services/services.homeHealthPackageReq.dto");

const createHomeHealthPackageReqController = async (req, res) => {
    try {
        const homeHealthCheckupReq = createHomeHealthCheckupDto(req.body);
        const errors = validateHomeHealthCheckupFields(homeHealthCheckupReq);
        if (Object.keys(errors).length > 0) {
            sendResponse(res, null, 400, false, errors);
            return
        }
        await createHomeHealthPackageReqServices({ ...homeHealthCheckupReq, createdBy: req.user._id });
        sendResponse(res, null, 201, true, "Home health package request created successfully");
        return
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

module.exports = {
    createHomeHealthPackageReqController
};