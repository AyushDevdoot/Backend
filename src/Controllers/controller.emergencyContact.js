const { validateEmergencyContact, createEmergencyContactDto, updateEmergencyContactDto } = require("../DTOs/emergencyContact.dto");
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const { createEmergencyContactServices, getEmergencyContactServices, getEmergencyContactByIdServices, updateEmergencyContactServices } = require("../Services/services.emergencyContact");

const addEmergencyContactController = async (req, res) => {
    try {
        const emergencyContact = createEmergencyContactDto(req.body);
        const errors = validateEmergencyContact(emergencyContact);
        if (Object.keys(errors).length > 0) {
            sendResponse(res, null, 400, false, errors);
            return
        }
        await createEmergencyContactServices({ ...emergencyContact, userId: req.user._id });
        sendResponse(res, null, 201, true, "Emergency contact created successfully");
        return
    } catch (err) {
        console.log(err);
        sendResponse(res, err);
        return
    }
};

const getEmergencyContactController = async (req, res) => {
    try {
        const emergencyContact = await getEmergencyContactServices(req.user._id);
        if (!emergencyContact) {
            sendResponse(res, null, 400, false, "Emergency contact not found");
            return
        } else {
            sendResponse(res, null, 200, true, "Emergency contact fetched successfully", emergencyContact);
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

const getEmergencyContactDetailsController = async (req, res) => {
    try {
        const emergencyContact = await getEmergencyContactByIdServices(req.params.contactId, req.user._id);
        if (!emergencyContact) {
            sendResponse(res, null, 400, false, "Emergency contact not found");
            return
        } else {
            sendResponse(res, null, 200, true, "Emergency contact fetched successfully", emergencyContact);
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

const updateEmergencyContactController = async (req, res) => {
    try {
        const emergencyContact = await getEmergencyContactByIdServices(req.params.contactId, req.user._id);
        if (!emergencyContact) {
            sendResponse(res, null, 400, false, "Emergency contact not found");
            return
        } else {
            const emergencyContactBody = updateEmergencyContactDto(req.body, emergencyContact);
            await updateEmergencyContactServices(emergencyContact._id, emergencyContactBody, req.user._id);
            sendResponse(res, null, 200, true, "Emergency contact updated successfully");
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

module.exports = {
    addEmergencyContactController,
    getEmergencyContactController,
    updateEmergencyContactController,
    getEmergencyContactDetailsController
};