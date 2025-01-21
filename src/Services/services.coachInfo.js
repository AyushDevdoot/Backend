const CoachInfoModel = require("../Models/models.coachInfo");

const createCoachInfoServices = async (coachInfo) => {
    const finalBody = new CoachInfoModel(coachInfo);
    return await finalBody.save();
};

const getCoachInfoServices = async (query) => {
    return await CoachInfoModel.find(query);
};

const getCoachInfoByIdServices = async (coachId) => {
    return await CoachInfoModel.findOne({ _id: coachId });
};

const updateCoachInfoServices = async (coachId, coachInfoBody) => {
    return await CoachInfoModel.updateOne({ _id: coachId }, coachInfoBody);
};

module.exports = {
    createCoachInfoServices,
    getCoachInfoServices,
    getCoachInfoByIdServices,
    updateCoachInfoServices
};