const seniorCareGiverFinderModel = require("../Models/models.seniorCareGiverFinder");

const createSeniorCareGiverFinderServices = async (seniorCareGiver) => {
    const finalBody = new seniorCareGiverFinderModel(seniorCareGiver);
    return await finalBody.save();
}

module.exports = {
    createSeniorCareGiverFinderServices
}