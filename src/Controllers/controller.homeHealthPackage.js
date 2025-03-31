const { homeHealthDto, validateHomeHealthPackageFields } = require("../DTOs/homeHealthCheckup.dto");
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const { createHomeHealthCheckupServices, getHomeHealthCheckupServices } = require("../Services/services.healthHomePackage");
const createHomeHealthPackageController = async (req, res) => {
    try {
        const createPackageBody = homeHealthDto(req.body);
        const errors = validateHomeHealthPackageFields(createPackageBody);
        if (Object.keys(errors).length > 0) {
            sendResponse(res, null, 400, false, errors);
            return
        }
        await createHomeHealthCheckupServices({ ...createPackageBody, createdBy: req.user._id });
        sendResponse(res, null, 201, true, "Home health package created successfully");
        return
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

const getHomeHealthPackageController = async (req, res) => {
    try {
        const homeHealth = await getHomeHealthCheckupServices();
        if (homeHealth.length === 0) {
            sendResponse(res, null, 400, false, "Home health package not found");
            return
        } else {
            sendResponse(res, null, 200, true, "Home health package fetched successfully", homeHealth);
            return
        }
    } catch (err) {
        sendResponse(res, err);
    }
};

module.exports = {
    createHomeHealthPackageController,
    getHomeHealthPackageController
};