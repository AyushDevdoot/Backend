const CoachTimeslotModel = require("../Models/models.coachTimeslot");
const {generateTimeSlots} = require("../Helpers/helpers.generateSlots");


const createCoachTimeSlotServices = async (coachTimeSlot) => {
    coachTimeSlot = generateTimeSlots(coachTimeSlot,45);
    console.log(coachTimeSlot);
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