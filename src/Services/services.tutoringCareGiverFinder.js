const tutoringCareGiverFinderModel = require("../Models/models.tutoringCareGiverFinder");

const createTuringCareGiverFinderServices = async (careGiverFinder) => {
    const finalBody = new tutoringCareGiverFinderModel(careGiverFinder);
    return await finalBody.save();
}

module.exports = {
    createTuringCareGiverFinderServices
}