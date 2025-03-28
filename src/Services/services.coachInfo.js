const CoachInfoModel = require("../Models/models.coachInfo");

const createCoachInfoServices = async (coachInfo) => {
    const existingCoach = await CoachInfoModel.findOne({ createdBy: coachInfo.createdBy });

    if (existingCoach) {
        throw new Error("You have already created a coach profile.");
    }

    const finalBody = new CoachInfoModel(coachInfo);
    return await finalBody.save();
};

const getCoachInfoServices = async (query) => {
    return await CoachInfoModel.find(query);
};

const getCoachInfoByIdServices = async (coachId) => {
    return await CoachInfoModel.findOne({ _id: coachId });
};

const updateCoachInfoServices = async (userId, updateData) => {
    try {
        const updatedCoach = await CoachInfoModel.findOneAndUpdate(
            { createdBy: userId },
            { $set: updateData },
            { new: true, runValidators: true }
        );
        return updatedCoach;
    } catch (error) {
        console.error("Error in updateCoachInfoServices:", error);
        throw error;
    }
};

const getCoachProfileServices = async(coachId)=>{
    return await CoachInfoModel.findOne({ createdBy: coachId });
}

const deleteCoachProfileServices = async(coachId)=>{
    await CoachInfoModel.findOneAndDelete({ createdBy: coachId });
}

module.exports = {
    createCoachInfoServices,
    getCoachInfoServices,
    getCoachInfoByIdServices,
    updateCoachInfoServices,
    getCoachProfileServices,
    deleteCoachProfileServices
};