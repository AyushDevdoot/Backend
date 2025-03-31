const { createTutoringCareGiverFinderDto, validateTutoringCareGiverFinderFields } = require("../DTOs/tutoring.dto");
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const { createTuringCareGiverFinderServices } = require("../Services/services.tutoringCareGiverFinder");
const createTutoringCareGiverFinderController = async (req, res) => {
    try {
        const careGiverFinder = createTutoringCareGiverFinderDto(req.body);
        const errors = validateTutoringCareGiverFinderFields(careGiverFinder);
        if (Object.keys(errors).length > 0) {
            sendResponse(res, null, 400, false, errors);
            return
        }
        await createTuringCareGiverFinderServices({ ...careGiverFinder, createdBy: req.user._id });
        sendResponse(res, null, 201, true, "Created Successfully");
        return
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

module.exports = {
    createTutoringCareGiverFinderController
};