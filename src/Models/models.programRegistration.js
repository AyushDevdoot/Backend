const mongoose = require('mongoose');

const programRegistrationSchema = new mongoose.Schema({
    programId: {
        type: String,
        ref: "programmodule",
        required: true
    },
    participantId: {
        type: String,
        ref: "user",
        required: true
    },
    registrationStatus: {
        type: String,
        enum: ["pending", "confirmed", "cancelled"],
        required: true
    },
    feedback: {
        type: String,
    },
    completedDate: {
        type: String,
        required: true
    }
}, { timestamps: true });

const ProgramRegistrationModel = mongoose.model('programregistration', programRegistrationSchema);

module.exports = ProgramRegistrationModel;