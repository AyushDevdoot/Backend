const mongoose = require('mongoose');

const medicalHistorySchema = new mongoose.Schema({
    patientId: {
        type: String,
        ref: "user",
        required: true
    },
    diagnosis: {
        type: String,
        required: true
    },
    treatmentPlan: {
        type: String,
        required: true
    },
    medications: {
        type: String,
        default: null
    },
    allergies: {
        type: String,
        default: null
    },
    doctorId: {
        type: String,
        ref: "dietitianinfo",
        required: true
    },
    hospitalId: {
        type: String,
        ref: "healthcamp",
        required: true
    },
    visitDate: {
        type: String,
        required: true
    },
    followUpDate: {
        type: String,
        required: true
    },
    notes: {
        type: String,
        requried: true
    }
}, { timestamps: true });

const MedicalHistoryModel = mongoose.model('medicalhistory', medicalHistorySchema);

module.exports = MedicalHistoryModel;