const CoachTimeslotModel = require("../Models/models.coachTimeslot");
const generateTimeSlots = require("../Helpers/helpers.generateSlots");
const CoachInfo = require ("../Models/models.coachInfo");

const createCoachTimeSlotServices = async (coachTimeSlot) => {
    console.log(coachTimeSlot.coachId);
    const coach = await CoachInfo.findById(coachTimeSlot.coachId, 'sessionTime');
  
  // 2. Validate the coach exists and has sessionTime
  if (!coach) {
    throw new Error("Coach not found.");
  }
  if (!coach.sessionTime) {
    throw new Error("Session time not configured for this coach.");
  }

  // 3. Extract the numeric session duration (e.g., 60)
  const slotDuration = coach.sessionTime;
    // const minutesSession = await CoachInfo.findById(coachTimeSlot.coachId, 'sessionTime');
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