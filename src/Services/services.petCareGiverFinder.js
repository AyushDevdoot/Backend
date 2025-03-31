const petCareGiverFinderService = require("../Models/models.petCareGiverFinder");

const createPetCareGiverServices = async (petCareGiver) => {
    const finalBody = new petCareGiverFinderService(petCareGiver);
    return await finalBody.save();
}

module.exports = {
    createPetCareGiverServices
}