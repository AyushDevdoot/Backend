const CoachTimeslotModel = require("../Models/models.coachTimeslot");
const generateTimeSlots = require("../Helpers/helpers.generateSlots");


const createCoachTimeSlotServices = async (coachTimeSlot) => {
    coachTimeSlot = generateTimeSlots(coachTimeSlot,45);

    const finalBody = new CoachTimeslotModel(coachTimeSlot);
    console.log("Hua")
    return await finalBody.save();
}

const getCoachTimeSlotServices = async (coachId) => {
    console.log("Looking for Coach Time Slot with ID:", coachId);
    // return await CoachTimeslotModel.findOne({ coachId }).populate("coachId");
    return await CoachTimeslotModel.findOne({ coachId })
}
module.exports = {
    createCoachTimeSlotServices,
    getCoachTimeSlotServices
}