const SpecialistDetailsModel = require("../Models/models.specialistDetails");

const createSpecialistDetailsServices = async (specialistDetails) => {
    const finalBody = new SpecialistDetailsModel(specialistDetails);
    return await finalBody.save();
}

const getAllSpecialistController = async (query) => {
    return await SpecialistDetailsModel.find(query);
}

module.exports = {
    createSpecialistDetailsServices,
    getAllSpecialistController
}