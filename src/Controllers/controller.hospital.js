const { createHospitalDto, validateHospitalFields, updateHospitalDto } = require("../DTOs/hospital.dto");
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const { 
    createHospitalServices, 
    getHospitalByQueryServices, 
    getHospitalByIdServices, 
    updateHospitalServices 
} = require("../Services/services.hospital");

const createHospitalController = async (req, res) => {
    try {
        const hospitalData = createHospitalDto(req.body);
        const errors = validateHospitalFields(hospitalData);
        
        if (Object.keys(errors).length > 0) {
            return sendResponse(res, null, 400, false, errors);
        }

        const hospital = await createHospitalServices(hospitalData);
        return sendResponse(res, null, 201, true, "Hospital created successfully", hospital);
    } catch (err) {
        console.error("Create hospital error:", err);
        return sendResponse(res, err, 500, false, "Error creating hospital");
    }
};

const searchHospitalsController = async (req, res) => {
    try {
        const {
            latitude,
            longitude,
            category,
            type: hospitalType,
            search: searchTerm,
            sortBy,
            maxDistance
        } = req.query;

        if (!latitude || !longitude) {
            return sendResponse(res, null, 400, false, "Latitude and longitude are required");
        }

        const searchParams = {
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
            category,
            hospitalType,
            searchTerm,
            sortBy,
            maxDistance: maxDistance ? parseFloat(maxDistance) * 1000 : undefined
        };

        const hospitals = await getHospitalByQueryServices(searchParams);

        if (hospitals.length === 0) {
            return sendResponse(res, null, 200, false, "No hospitals found in the specified area");
        }

        return sendResponse(res, null, 200, true, "Hospitals fetched successfully", hospitals);
    } catch (err) {
        console.error("Search hospitals error:", err);
        return sendResponse(res, err, 500, false, "Error searching hospitals");
    }
};

const getHospitalDetailsController = async (req, res) => {
    try {
        const hospital = await getHospitalByIdServices(req.params.hospitalId);
        
        if (!hospital) {
            return sendResponse(res, null, 404, false, "Hospital not found");
        }

        return sendResponse(res, null, 200, true, "Hospital details fetched successfully", hospital);
    } catch (err) {
        console.error("Get hospital details error:", err);
        return sendResponse(res, err, 500, false, "Error fetching hospital details");
    }
};

const updateHospitalController = async (req, res) => {
    try {
        const hospitalId = req.params.hospitalId;
        const updateData = updateHospitalDto(req.body);

        if (Object.keys(updateData).length === 0) {
            return sendResponse(res, null, 400, false, "No valid update fields provided");
        }

        const updatedHospital = await updateHospitalServices(hospitalId, updateData);

        if (!updatedHospital) {
            return sendResponse(res, null, 404, false, "Hospital not found");
        }

        return sendResponse(res, null, 200, true, "Hospital updated successfully", updatedHospital);
    } catch (err) {
        console.error("Update hospital error:", err);
        return sendResponse(res, err, 500, false, "Error updating hospital");
    }
};

module.exports = {
    createHospitalController,
    searchHospitalsController,
    getHospitalDetailsController,
    updateHospitalController
};