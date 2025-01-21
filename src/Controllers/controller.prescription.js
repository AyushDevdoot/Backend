const { createPrescriptionDto, validatePrescriptionFields } = require("../DTOs/prescription.dto");
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const { createPrescriptionServices } = require("../Services/services.prescription");
const createPrescriptionController = async (req, res) => {
    try {
        const prescription = createPrescriptionDto(req.body);
        const errors = validatePrescriptionFields(prescription);
        if (Object.keys(errors).length > 0) {
            sendResponse(res, null, 400, false, errors);
            return
        }
        await createPrescriptionServices({ ...prescription, createdBy: req.user._id, imgUrl: "https://www.nicepng.com/png/detail/136-1366211_group-of-10-guys-login-user-icon-png.png" });
        sendResponse(res, null, 201, true, "Ayurveda consultation form created successfully");
        return
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

const getPrescriptionController = async (req, res) => {
    try {
        const prescription = await getPrescriptionServices();
        if (prescription.length === 0) {
            sendResponse(res, null, 400, false, "Prescription not found");
            return
        } else {
            sendResponse(res, null, 200, true, "Prescription fetched successfully", prescription);
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

module.exports = {
    createPrescriptionController,
    getPrescriptionController
};