const mongoose = require('mongoose');

const treatmentExpertSchema = new mongoose.Schema({
    expertName: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    contactInfo: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    experienceYears: {
        type: Number,
        required: true,
        default: 0
    }
}, { timestamps: true });

const TreatmentExpertModel = mongoose.model('treatmentexpert', treatmentExpertSchema);

module.exports = TreatmentExpertModel;