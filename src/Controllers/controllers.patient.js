const { patientInfoDto } = require("../DTOs/patientInfo.dto");
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const { createPatientInfoServices, getPatientInfoByIdService } = require("../Services/services.patientInfo");

const createPatientDetailsController = async (req, res) => {
    const patientInfo = patientInfoDto(req.body);
    const patient =  createPatientInfoServices({ ...patientInfo, createdBy: req.user._id });
    sendResponse(res, patient, 201, true, "Patient Info Successfully Created");
};

const getPatientDetailsController = async (req, res) => {
    try {
        const { id } = req.params; 
       
        const patientDetails = await getPatientInfoByIdService(id);

        if (!patientDetails) {
            return sendResponse(res, null, 404, false, "Patient not found");
        }

        
        sendResponse(res, patientDetails, 200, true, "Patient info fetched successfully");
    } catch (error) {
        console.error("Error fetching patient details:", error);
        sendResponse(res, null, 500, false, "Internal server error");
    }
};

module.exports = {
    createPatientDetailsController,
    getPatientDetailsController
};