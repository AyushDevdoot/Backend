const CoachTimeslotModel = require("../Models/models.coachTimeslot");
const generateTimeSlots = require("../Helpers/helpers.generateSlots");
const CoachInfo = require ("../Models/models.coachInfo");

const createCoachTimeSlotServices = async (coachTimeSlot) => {
    console.log(coachTimeSlot.coachId);
    const minutesSession = await CoachInfo.findById(coachTimeSlot.coachId, 'sessionTimee');
    coachTimeSlot = generateTimeSlots(coachTimeSlot,minutesSession);

    const finalBody = new CoachTimeslotModel(coachTimeSlot);
    console.log("Hua")
    return await finalBody.save();
}

const getCoachTimeSlotServices = async (coachId) => {
    console.log("Looking for Coach Time Slot with ID:", coachId);
    return await CoachTimeslotModel.findOne({ coachId }).populate("coachId");
    // return await CoachTimeslotModel.findOne({ coachId })
}
module.exports = {
    createCoachTimeSlotServices,
    getCoachTimeSlotServices
}