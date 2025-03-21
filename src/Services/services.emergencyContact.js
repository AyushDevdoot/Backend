const EmergencyContactModel = require("../Models/models.emergencyContact");

const createEmergencyContactServices = async (emergencyContact) => {
    const finalBody = new EmergencyContactModel(emergencyContact);
    return await finalBody.save();
};

const getEmergencyContactServices = async (userId) => {
    return await EmergencyContactModel.find({ userId });
};

const getEmergencyContactByIdServices = async (emergencyContactId, userId) => {
    return await EmergencyContactModel.findOne({ _id: emergencyContactId, userId });
};

const updateEmergencyContactServices = async (emergencyContactId, emergencyContactBody) => {
    return await EmergencyContactModel.findByIdAndUpdate(emergencyContactId, emergencyContactBody);
};

const deleteEmergencyContactServices = async (emergencyContactId, userId) => {
    return await EmergencyContactModel.findOneAndDelete({ _id: emergencyContactId, userId });
};

module.exports = {
    createEmergencyContactServices,
    getEmergencyContactServices,
    updateEmergencyContactServices,
    getEmergencyContactByIdServices,
    deleteEmergencyContactServices
};