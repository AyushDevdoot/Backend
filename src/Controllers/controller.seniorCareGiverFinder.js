const { createSeniorCareGiverFinderDto, validateSeniorCareGiverFinderFields } = require("../DTOs/seniorCareGiverFinder.dto");
const { createSeniorCareGiverFinderServices } = require("../Services/services.seniorCareFinder");
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const createSeniorCareGiverFinderController = async (req, res) => {
    try {
        const careGiverFinder = createSeniorCareGiverFinderDto(req.body);
        const errors = validateSeniorCareGiverFinderFields(careGiverFinder);
        if (Object.keys(errors).length > 0) {
            sendResponse(res, null, 400, false, errors);
            return
        }
        await createSeniorCareGiverFinderServices({ ...careGiverFinder, createdBy: req.user._id });
        sendResponse(res, null, 201, true, "Care giver finder created successfully");
        return
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

module.exports = {
    createSeniorCareGiverFinderController
};