const CoachTimeslotModel = require("../Models/models.coachTimeslot");
const generateTimeSlots = require("../Helpers/helpers.generateSlots");
const CoachInfo = require ("../Models/models.coachInfo");

const createCoachTimeSlotServices = async (coachTimeSlot) => {
    console.log(coachTimeSlot.coachId);
    const coach = await CoachInfo.findById(coachTimeSlot.coachId, 'sessionTime');
  

  if (!coach) {
    throw new Error("Coach not found.");
  }
  if (!coach.sessionTime) {
    throw new Error("Session time not configured for this coach.");
  }

  const slotDuration = coach.sessionTime;

    coachTimeSlot = generateTimeSlots(coachTimeSlot,slotDuration);

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