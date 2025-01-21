const FirstAidTrainingModel = require("../Models/models.firstAidTraining");

const createFirstAidTrainingServices = async (firstAidTraining) => {
    const finalBody = new FirstAidTrainingModel(firstAidTraining);
    return await finalBody.save();
}

module.exports = {
    createFirstAidTrainingServices
}