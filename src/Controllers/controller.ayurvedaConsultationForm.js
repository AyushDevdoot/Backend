const { createAyurvedaConsultationFormDto, validateAyurvedaConsultationFormFields } = require("../DTOs/ayurvedaConsultation.dto");
const { createAyurvedicConsultationFormServices } = require("../Services/services.ayurvedicConsultationForm");

const { sendResponse } = require("../Helpers/helpers.commonFunc");
const createAyurvedaConsultationFormController = async (req, res) => {
    try {
        const ayurvedaConsultationForm = createAyurvedaConsultationFormDto(req.body);
        const errors = validateAyurvedaConsultationFormFields(ayurvedaConsultationForm);
        if (Object.keys(errors).length > 0) {
            sendResponse(res, null, 400, false, errors);
            return
        }
        await createAyurvedicConsultationFormServices({ ...ayurvedaConsultationForm, createdBy: req.user._id });
        sendResponse(res, null, 201, true, "Ayurveda consultation form created successfully");
        return
    } catch (err) {
        console.log(err);
        sendResponse(res, err);
        return
    }
};

const getAyurvedaConsultationFormController = async (req, res) => {
    try {
        const ayurvedaConsultationForm = await getAyurvedaConsultationFormServices();
        if (ayurvedaConsultationForm.length === 0) {
            sendResponse(res, null, 400, false, "Ayurveda consultation form not found");
            return
        } else {
            sendResponse(res, null, 200, true, "Ayurveda consultation form fetched successfully", ayurvedaConsultationForm);
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

module.exports = {
    createAyurvedaConsultationFormController,
    getAyurvedaConsultationFormController
};