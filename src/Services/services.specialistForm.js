const SpecialistFormModel = require("../Models/models.specialistForm");

const createSpecialistFormServices = async (specialistForm) => {
    const finalBody = new SpecialistFormModel(specialistForm);
    return await finalBody.save();
}

module.exports = {
    createSpecialistFormServices
}