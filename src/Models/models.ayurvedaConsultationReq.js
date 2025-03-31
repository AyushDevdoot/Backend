const mongoose = require('mongoose');

const ayurvedaConsultationReqSchema = new mongoose.Schema({
    name: {
        type: String,
        maxLength: 100,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        required: true
    },
    contactInfo: {
        type: String,
        maxLength: 100,
        required: true
    },
    healthConcerns: {
        type: String,
        maxLength: 100,
        required: true
    },
    doshaConsultation: {
        type: String,
        maxLength: 100,
        default: null
    },
    herbalRemedies: {
        type: String,
        requried: true
    },
    ayurvedicNutrition: {
        type: String,
        requried: true
    },
    consultationDate: {
        type: String,
        required: true
    },
    consultationStatus: {
        type: String,
        enum: ["pending", "completed"],
        required: true
    },
    consultationNotes: {
        type: String,
    }
}, { timestamps: true });

const AyurvedaConsultationReqModel = mongoose.model('ayurvedaconsultationreq', ayurvedaConsultationReqSchema);

module.exports = AyurvedaConsultationReqModel;