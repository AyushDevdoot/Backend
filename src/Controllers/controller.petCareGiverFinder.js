const { createPetCareGiverFinderDto, validatePetCareGiverFinderFields } = require("../DTOs/petCareGiverFinder.dto");
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const { createPetCareGiverServices } = require("../Services/services.petCareGiverFinder");

const createPetCareGiverController = async (req, res) => {
    try {
        const petCareGiver = createPetCareGiverFinderDto(req.body);
        const errors = validatePetCareGiverFinderFields(petCareGiver);
        if (Object.keys(errors).length > 0) {
            sendResponse(res, null, 400, false, errors);
            return
        }
        await createPetCareGiverServices({ ...petCareGiver, createdBy: req.user._id });
        sendResponse(res, null, 201, true, "Pet care giver finder created successfully");
        return
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

module.exports = {
    createPetCareGiverController
};