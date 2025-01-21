const PetCareFormModel = require("../Models/models.petCareFrom");

const createPetCareFormServices = async (petCareForm) => {
    const finalBody = new PetCareFormModel(petCareForm);
    return await finalBody.save();
}

module.exports = {
    createPetCareFormServices
}