const { validateSpecialistFields, createSpecialistDto } = require("../DTOs/specialist.dto");
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const { createSpecialistDetailsServices, getAllSpecialistController } = require("../Services/services.specialistDetails");

const createSpecialistDetailsController = async (req, res) => {
    try {
        const specialistDetails = createSpecialistDto(req.body);
        const errors = validateSpecialistFields(specialistDetails);
        if (Object.keys(errors).length > 0) {
            sendResponse(res, null, 400, false, errors);
            return
        }
        await createSpecialistDetailsServices({ ...specialistDetails, createdBy: req.user._id });
        sendResponse(res, null, 201, true, "Specialist details created successfully");
        return
    } catch (err) {
        console.log(err);
        sendResponse(res, err);
        return
    }
};

const getSpecialistDetailsController = async (req, res) => {
    try {
        let query = {};
        if (req.query.categoryName) {
            query.specialistServiceCategory = req.query.categoryName;
        }
        const specialistDetails = await getAllSpecialistController(query);
        if (specialistDetails.length === 0) {
            sendResponse(res, null, 200, false, "Specialist details not found");
            return
        } else {
            sendResponse(res, null, 200, true, "Specialist details fetched successfully", specialistDetails);
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

module.exports = {
    createSpecialistDetailsController,
    getSpecialistDetailsController
};