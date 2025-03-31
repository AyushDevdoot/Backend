const childCareGiverFinderModel = require("../Models/models.childCareGiverFinder");

const createChildCareGiverServices = async (childCareGiver) => {
    const finalBody = new childCareGiverFinderModel(childCareGiver);
    return await finalBody.save();
}

module.exports = {
    createChildCareGiverServices
}