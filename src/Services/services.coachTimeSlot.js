const CoachTimeslotModel = require("../Models/models.coachTimeslot");

const createCoachTimeSlotServices = async (coachTimeSlot) => {
    const finalBody = new CoachTimeslotModel(coachTimeSlot);
    return await finalBody.save();
}

const getCoachTimeSlotServices = async (coachId) => {
    return await CoachTimeslotModel.findOne({ coachId });
}
module.exports = {
    createCoachTimeSlotServices,
    getCoachTimeSlotServices
}