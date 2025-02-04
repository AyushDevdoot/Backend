const CoachTimeslotModel = require("../Models/models.coachTimeslot");
const generateTimeSlots = require("../Helpers/helpers.generateSlots");


const createCoachTimeSlotServices = async (coachTimeSlot) => {
    coachTimeSlot = generateTimeSlots(coachTimeSlot,45);

    const finalBody = new CoachTimeslotModel(coachTimeSlot);
    console.log("Hua")
    return await finalBody.save();
}

const getCoachTimeSlotServices = async (coachId) => {
    return await CoachTimeslotModel.findOne({ coachId });
}
module.exports = {
    createCoachTimeSlotServices,
    getCoachTimeSlotServices
}