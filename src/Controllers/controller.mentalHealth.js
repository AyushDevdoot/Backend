const { createMentalHelathFormDto, validateMentalHealthFormFields } = require("../DTOs/mentalHealth.dto");
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const { createMentalHealthFormServices } = require("../Services/services.mentalHealth");

const createMentalHealthFormController = async (req, res) => {
    try {
        const mentalHealthForm = createMentalHelathFormDto(req.body);
        const errors = validateMentalHealthFormFields(mentalHealthForm);
        if (Object.keys(errors).length > 0) {
            sendResponse(res, null, 400, false, errors);
            return
        }
        await createMentalHealthFormServices({ ...mentalHealthForm, createdBy: req.user._id });
        sendResponse(res, null, 201, true, "Mental health form created successfully");
        return
    } catch (err) {
        console.log(err)
        sendResponse(res, err);
        return
    }
};

const getMentalHealthFormController = async (req, res) => {
    try {
        const mentalHealthForm = await getMentalHealthFormServices();
        if (mentalHealthForm.length === 0) {
            sendResponse(res, null, 400, false, "Mental health form not found");
            return
        } else {
            sendResponse(res, null, 200, true, "Mental health form fetched successfully", mentalHealthForm);
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

module.exports = {
    createMentalHealthFormController,
    getMentalHealthFormController
};