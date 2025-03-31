const { createCheckupPackageDto, validateHealthCheckupPackageFields, updateHealthCheckupPackageDto } = require("../DTOs/healthCheckupPackage.dto");
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const { createHealthCheckupPackageServices, getHealthCheckupPackageServices, getHealthCheckupPackageByIdServices, updateHealthCheckupPackageServices } = require("../Services/services.healthCheckupPackage");

const createHelathCheckupPackageController = async (req, res) => {
    try {
        const healthCheckupPackage = createCheckupPackageDto(req.body);
        const errors = validateHealthCheckupPackageFields(healthCheckupPackage);
        if (Object.keys(errors).length > 0) {
            sendResponse(res, null, 400, false, errors);
            return
        }
        await createHealthCheckupPackageServices(healthCheckupPackage);
        sendResponse(res, null, 201, true, "health checkup package created successfully");
        return
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

const getHealthCheckupPackageController = async (req, res) => {
    try {
        const healthCheckupPackage = await getHealthCheckupPackageServices();
        if (healthCheckupPackage.length === 0) {
            sendResponse(res, null, 400, false, "health checkup package not found");
            return
        } else {
            sendResponse(res, null, 200, true, "health checkup package fetched successfully", healthCheckupPackage);
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

const getHealthCheckupPackageDetailsController = async (req, res) => {
    try {
        const healthCheckupPackage = await getHealthCheckupPackageByIdServices(req.params.healthCheckupPackageId);
        if (!healthCheckupPackage) {
            sendResponse(res, null, 400, false, "health checkup package not found");
            return
        } else {
            sendResponse(res, null, 200, true, "health checkup package fetched successfully", healthCheckupPackage);
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

const updateHealthCheckupPackageController = async (req, res) => {
    try {
        const healthCheckupPackage = await getHealthCheckupPackageByIdServices(req.params.healthCheckupPackageId);
        if (!healthCheckupPackage) {
            sendResponse(res, null, 400, false, "health checkup package not found");
            return
        } else {
            const healthCheckupPackageBody = updateHealthCheckupPackageDto(req.body, healthCheckupPackage);
            await updateHealthCheckupPackageServices(healthCheckupPackage._id, healthCheckupPackageBody);
            sendResponse(res, null, 200, true, "health checkup package updated successfully");
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

module.exports = {
    createHelathCheckupPackageController,
    getHealthCheckupPackageController,
    getHealthCheckupPackageDetailsController,
    updateHealthCheckupPackageController
};