const mongoose = require('mongoose');
const { profile } = require('winston');

const expertDetailsSchema = new mongoose.Schema({
    expertName: {
        type: String,
        maxLength: 100,
        required: true
    },
    specialization: {
        type: String,
        maxLength: 100,
        required: true
    },
    experienceYear: {
        type: Number,
        required: true
    },
    contactInfo: {
        type: String,
        maxLength: 100,
        required: true
    },
    profilePhoto: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        max: 5,
        min: 0,
        default: 0
    },
}, { timestamps: true });

const ExpertDetailsModel = mongoose.model('expertdetails', expertDetailsSchema);

module.exports = ExpertDetailsModel;