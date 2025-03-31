const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coachAppointmentSchema = new Schema({
    coachId: {
        type: Schema.Types.ObjectId,
        ref: 'coach',
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        ref: 'user',
        required: true,
    },
    status: {
        type: String,
        enum: ["received", "payment-pending", "request-confirmed", "cancelled-customer", "cancelled-admin"],
        default: "received",
    }
}, { timestamps: true });

const CoachAppointmentModel = mongoose.model('coachAppointment', coachAppointmentSchema);

module.exports = CoachAppointmentModel;