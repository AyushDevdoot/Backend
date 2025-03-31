const HospitalModel = require("../Models/models.hospital");

const createHospitalServices = async (hospital) => {
    const finalBody = new HospitalModel(hospital);
    return await finalBody.save();
};

const getHospitalServices = async () => {
    return await HospitalModel.find();
};

const getHospitalByIdServices = async (hospitalId) => {
    return await HospitalModel.findOne({ _id: hospitalId });
};

const updateHospitalServices = async (hospitalId, hospitalBody) => {
    return await HospitalModel.updateOne({ _id: hospitalId }, hospitalBody);
};

const getHospitalByQueryServices = async (query) => {
    return await HospitalModel.find(query).select("hospitalName city streetAddress area district state zipCode category review pincode opdTimings");
};

module.exports = {
    createHospitalServices,
    getHospitalServices,
    getHospitalByIdServices,
    updateHospitalServices,
    getHospitalByQueryServices
};