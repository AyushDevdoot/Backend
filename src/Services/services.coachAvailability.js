const CoachAvailabilityModel = require("../Models/models.coachAvailability");

const createCoachAvailabilityServices = async (availability) => {
    return await CoachAvailabilityModel.insertMany(availability);
}

const getCoachAllAvailabilityServices = async (coachId) => {
    return await CoachAppointmentModel.findAll(coachId);
}

const getCoachAvailabilityOfDayServices = async (coachId, day) => {
    return await CoachAvailabilityModel.findOne({ coachId, day })
}

module.exports = {
    createCoachAvailabilityServices,
    getCoachAllAvailabilityServices,
    getCoachAvailabilityOfDayServices
}
