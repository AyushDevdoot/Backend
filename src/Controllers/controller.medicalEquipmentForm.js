const { createMedicalEquipmentDto, validateMedicalEquipmentFields } = require("../DTOs/medicalEquipmentForm.dto");
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const { createMedicalEquipmentFormServices } = require("../Services/services.medicalEquipmentForm");

const createMedicalEquipmentFormController = async (req, res) => {
    try {
        const medicalEquipmentForm = createMedicalEquipmentDto(req.body);
        const errors = validateMedicalEquipmentFields(medicalEquipmentForm);
        if (Object.keys(errors).length > 0) {
            sendResponse(res, null, 400, false, errors);
            return
        }
        await createMedicalEquipmentFormServices({ ...medicalEquipmentForm, createdBy: req.user._id });
        sendResponse(res, null, 201, true, "Medical equipment form created successfully");
        return
    }
    catch (err) {
        console.log(err);
        sendResponse(res, err);
    }
}

const getMedicalEquipmentFormController = async (req, res) => {
    try {
        const medicalEquipmentForm = await getMedicalEquipmentFormServices();
        if (medicalEquipmentForm.length === 0) {
            sendResponse(res, null, 400, false, "Medical equipment form not found");
            return
        } else {
            sendResponse(res, null, 200, true, "Medical equipment form fetched successfully", medicalEquipmentForm);
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

module.exports = {
    createMedicalEquipmentFormController,
    getMedicalEquipmentFormController
};