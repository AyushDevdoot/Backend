const { createImmunicareDto, validateImmunicareFields } = require("../DTOs/immunicare.dto");
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const { createImmunicareServices, getImmunicareServices } = require("../Services/services.immunicare");

const createImmunicareController = async (req, res) => {
    try {
        const immunicare = createImmunicareDto(req.body);
        const errors = validateImmunicareFields(immunicare);
        if (Object.keys(errors).length > 0) {
            sendResponse(res, null, 400, false, errors);
            return
        }
        await createImmunicareServices({ ...immunicare, createdBy: req.user._id });
        sendResponse(res, null, 201, true, "Immunicare created successfully");
        return
    } catch (err) {
        console.log(err);
        sendResponse(res, err);
        return
    }
};

const getImmunicareController = async (req, res) => {
    try {
        const immunicare = await getImmunicareServices();
        if (immunicare.length === 0) {
            sendResponse(res, null, 400, false, "Immunicare not found");
            return
        } else {
            sendResponse(res, null, 200, true, "Immunicare fetched successfully", immunicare);
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

module.exports = {
    createImmunicareController,
    getImmunicareController
};