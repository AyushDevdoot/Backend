const mongoose = require('mongoose');

const specialistAppointmentSchedulingSchema = new mongoose.Schema({
    specialistId: {
        type: String,
        ref: "specialistdetails",
        required: true
    },
    userId: {
        type: String,
        ref: "user",
        required: true
    },
    appointmentTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["scheduled", "completed", "cancelled"],
        required: true
    }
})

const SpecialistAppointmentSchedulingModel = mongoose.model('specialistappointmentscheduling', specialistAppointmentSchedulingSchema);

module.exports = SpecialistAppointmentSchedulingModel;