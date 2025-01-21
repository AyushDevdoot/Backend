const { createPetServiceDto, validatePetCareFields } = require("../DTOs/petCare.dto");
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const { createPetCareFormServices } = require("../Services/services.petCareForm");

const createPetCareFormController = async (req, res) => {
    try {
        const petCareForm = createPetServiceDto(req.body);
        const errors = validatePetCareFields(petCareForm);
        if (Object.keys(errors).length > 0) {
            sendResponse(res, null, 400, false, errors);
            return
        }
        await createPetCareFormServices({ ...petCareForm, createdBy: req.user._id });
        sendResponse(res, null, 201, true, "Pet care form created successfully");
        return
    } catch (err) {
        console.log(err);
        sendResponse(res, err);
        return
    }
};

const getPetCareFormController = async (req, res) => {
    try {
        const petCareForm = await getPetCareFormServices();
        if (petCareForm.length === 0) {
            sendResponse(res, null, 400, false, "Pet care form not found");
            return
        } else {
            sendResponse(res, null, 200, true, "Pet care form fetched successfully", petCareForm);
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

module.exports = {
    createPetCareFormController,
    getPetCareFormController
};