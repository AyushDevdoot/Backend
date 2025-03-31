const { createHospitalDto, validateHospitalFields, updateHospitalDto } = require("../DTOs/hospital.dto");
const { sendResponse } = require("../Helpers/helpers.commonFunc");
const { createHospitalServices, getHospitalServices, getHospitalByIdServices, updateHospitalServices, getHospitalByQueryServices } = require("../Services/services.hospital");

const createHospitalController = async (req, res) => {
    try {
        const hospitalBody = createHospitalDto(req.body);
        const errors = validateHospitalFields(hospitalBody);
        if (Object.keys(errors).length > 0) {
            sendResponse(res, null, 400, false, errors);
            return
        }
        await createHospitalServices(hospitalBody);
        sendResponse(res, null, 201, true, "Hospital created successfully");
        return;
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

const getHospitalController = async (req, res) => {
    try {
        const hospital = await getHospitalServices();
        if (hospital.length === 0) {
            sendResponse(res, null, 400, false, "Hospital not found");
            return
        } else {
            sendResponse(res, null, 200, true, "Hospital fetched successfully", hospital);
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

const getHospitalDetailsController = async (req, res) => {
    try {
        const hospital = await getHospitalByIdServices(req.params.hospitalId);
        if (!hospital) {
            sendResponse(res, null, 400, false, "Hospital not found");
            return
        } else {
            sendResponse(res, null, 200, true, "Hospital fetched successfully", hospital);
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

const updateHospitalController = async (req, res) => {
    try {
        const hospital = await getHospitalByIdServices(req.params.hospitalId);
        if (!hospital) {
            sendResponse(res, null, 400, false, "Hospital not found");
            return
        } else {
            const hospitalBody = updateHospitalDto(req.body, hospital);
            await updateHospitalServices(hospital._id, hospitalBody);
            sendResponse(res, null, 200, true, "Hospital updated successfully");
            return
        }
    } catch (err) {
        sendResponse(res, err);
        return
    }
};

const hospitalQuerySearchController = async (req, res) => {
    try {
        // hospitalType,hospitalName
        let query = {}
        if (req.query?.type) {
            if (req.query?.type != "all") {
                query.hospitalType = req.query.type.toString().toLowerCase();
            }
        }
        if (req.query?.name) {
            query.hospitalName = new RegExp(req.query.name.toString().toLowerCase(), 'i');
        }

        if (req.query?.category) {
            query.category = req.query.category.toString().toLowerCase();
        }

        const hospital = await getHospitalByQueryServices(query);
        if (hospital.length === 0) {
            sendResponse(res, null, 200, false, "Hospital not found");
            return
        } else {
            sendResponse(res, null, 200, true, "Hospital fetched successfully", hospital);
            return
        }
    } catch (err) {
        console.log(err);
        sendResponse(res, err);
        return
    }
};
module.exports = {
    createHospitalController,
    getHospitalDetailsController,
    updateHospitalController,
    getHospitalController,
    hospitalQuerySearchController
};