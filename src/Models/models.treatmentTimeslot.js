const mongoose = require('mongoose');

const treatmentTimeslotSchema = new mongoose.Schema({
    treatmentId: {
        type: String,
        ref: "treatmenttype",
        required: true
    },
    expertId: {
        type: String,
        ref: "treatmentexpert",
        required: true
    },
    availableDate: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        reqired: true
    },
    isBooked: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true });

const TreatmentTimeslotModel = mongoose.model('treatmenttimeslot', treatmentTimeslotSchema);

module.exports = TreatmentTimeslotModel;