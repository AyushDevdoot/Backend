const { validateEquipmentFields, createEquipmentDto, updateEquipmentDto } = require("../DTOs/medicalEquipmentDto");
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const { createMedicalEquipmentServices, getMedicalEquipmentByIdServices, getMedicalEquipmentBySRServices, updateEquipmentServices } = require("../Services/services.medicalEquipmentInfo");

const createMedicalEquipmentController = async (req, res) => {
    try {
        const equipmentBody = createEquipmentDto(req.body);
        const errors = validateEquipmentFields(equipmentBody);
        if (Object.keys(errors).length > 0) {
            sendResponse(res, null, 400, false, errors);
            return
        }
        await createMedicalEquipmentServices(equipmentBody);
        sendResponse(res, null, 201, true, "Equipment created successfully");
        return
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

const getMedicalEquipmentByIdController = async (req, res) => {
    try {
        const equipment = await getMedicalEquipmentByIdServices(req.params.equipmentId);
        if (!equipment) {
            sendResponse(res, null, 400, false, "Equipment not found");
            return
        } else {
            sendResponse(res, null, 200, true, "Equipment fetched successfully", equipment);
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

const getMedicalEquipmentBySRController = async (req, res) => {
    try {
        const equipment = await getMedicalEquipmentBySRServices(req.params.serialNumber);
        if (!equipment) {
            sendResponse(res, null, 400, false, "Equipment not found");
            return
        } else {
            sendResponse(res, null, 200, true, "Equipment fetched successfully", equipment);
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

const updateMedicalEquipmentController = async (req, res) => {
    try {
        const equipment = await getMedicalEquipmentByIdServices(req.params.equipmentId);
        if (!equipment) {
            sendResponse(res, null, 400, false, "Equipment not found");
            return
        } else {
            const equipmentBody = updateEquipmentDto(req.body);
            await updateEquipmentServices(equipment._id, equipmentBody);
            sendResponse(res, null, 200, true, "Equipment updated successfully");
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};
module.exports = {
    createMedicalEquipmentController,
    getMedicalEquipmentByIdController,
    getMedicalEquipmentBySRController,
    updateMedicalEquipmentController
};