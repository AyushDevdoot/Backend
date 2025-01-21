const CoachAppointmentModel = require("../Models/models.coachAppointment");

const createCoachAppointmentServices = async (coachAppointment) => {
    const finalBody = new CoachAppointmentModel(coachAppointment);
    return await finalBody.save();
}

const getCoachAllAppointmentsServices = async (coachId, date) => {
    return await CoachAppointmentModel.find({ coachId, date });
}

module.exports = {
    createCoachAppointmentServices,
    getCoachAllAppointmentsServices
}