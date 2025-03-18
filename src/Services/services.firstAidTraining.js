const FirstAidTrainingModel = require("../Models/models.firstAidTraining");

const createFirstAidTrainingServices = async (firstAidTraining) => {
    const finalBody = new FirstAidTrainingModel(firstAidTraining);
    return await finalBody.save();
}

const getFirstAidTrainingServices = async () => {
    return await FirstAidTrainingModel.find();
}

module.exports = {
    createFirstAidTrainingServices,
    getFirstAidTrainingServices
}