const mongoose = require('mongoose');

const expertAppointmentBookingSchema = new mongoose.Schema({
    expertId: {
        type: String,
        ref: "expertdetails",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    preferredTime: {
        type: String,
        requried: true
    },
    preferredDate: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "confirm", "cancelled"],
        required: true
    }
}, { timestamps: true });

const ExpertAppointmentBookingModel = mongoose.model('expertappointmentbooking', expertAppointmentBookingSchema);

module.exports = ExpertAppointmentBookingModel; 