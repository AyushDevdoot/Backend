const userDetailsPrescriptionModel = require("../Models/models.userDetailsPrescription");

const createPatientInfoServices = async (patientData) => {
    const newPatient = new userDetailsPrescriptionModel(patientData);
    return await newPatient.save();
};

const getPatientInfoByIdService = async (id) => {
    try {
        
        const patientDetails = await userDetailsPrescriptionModel.findById(id);

        if (!patientDetails) {
            return null; 
        }

        return patientDetails;
    } catch (error) {
        console.error("Error fetching patient by ID:", error);
        throw error;
    }
};

module.exports = {
    createPatientInfoServices,
    getPatientInfoByIdService
};