const { validateCorporateHealthFields, updateCorporateHealthDto } = require("../DTOs/corporateHealth.dto");
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const { createCorporateHealthServices, getCorporateHealthServices, getCorporateHealthByIdServices, updateCorporateHealthServices } = require("../Services/services.corporateHealth");

const createCorporateHealthController = async (req, res) => {
    try {
        const corporateHealth = req.body;
        const errors = validateCorporateHealthFields(corporateHealth);
        if (Object.keys(errors).length > 0) {
            sendResponse(res, null, 400, false, errors);
            return
        }
        await createCorporateHealthServices(corporateHealth);
        sendResponse(res, null, 201, true, "Corporate health created successfully");
        return
    } catch (err) {
        console.log(err);
        sendResponse(res, err);
        return
    }
};

const getCorporateHealthController = async (req, res) => {
    try {
        const corporateHealth = await getCorporateHealthServices();
        if (corporateHealth.length === 0) {
            sendResponse(res, null, 400, false, "Corporate health not found");
            return
        } else {
            sendResponse(res, null, 200, true, "Corporate health fetched successfully", corporateHealth);
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

const getCorporateHealthDetailsController = async (req, res) => {
    try {
        const corporateHealth = await getCorporateHealthByIdServices(req.params.corporateHealthId);
        if (!corporateHealth) {
            sendResponse(res, null, 400, false, "Corporate health not found");
            return
        } else {
            sendResponse(res, null, 200, true, "Corporate health fetched successfully", corporateHealth);
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

const updateCorporateHealthController = async (req, res) => {
    try {
        const corporateHealth = await getCorporateHealthByIdServices(req.params.corporateHealthId);
        if (!corporateHealth) {
            sendResponse(res, null, 400, false, "Corporate health not found");
            return
        } else {
            const corporateHealthBody = updateCorporateHealthDto(req.body, corporateHealth);
            await updateCorporateHealthServices(corporateHealth._id, corporateHealthBody);
            sendResponse(res, null, 200, true, "Corporate health updated successfully");
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

module.exports = {
    createCorporateHealthController,
    getCorporateHealthController,
    getCorporateHealthDetailsController,
    updateCorporateHealthController
};