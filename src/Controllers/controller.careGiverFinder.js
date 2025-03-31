const { validateChildCareGiverFinderFields, createChildCareGiverFinderDto } = require("../DTOs/careGiverFinder.dto");
const { createChildCareGiverServices } = require("../Services/services.careGiverFinder");
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const careGiverFinderController = async (req, res) => {
    try {
        const careGiverFinder = createChildCareGiverFinderDto(req.body);
        const errors = validateChildCareGiverFinderFields(careGiverFinder);
        if (Object.keys(errors).length > 0) {
            sendResponse(res, null, 400, false, errors);
            return
        }
        await createChildCareGiverServices({ ...careGiverFinder, createdBy: req.user._id });
        sendResponse(res, null, 201, true, "Care giver finder created successfully");
        return
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

module.exports = {
    careGiverFinderController
};