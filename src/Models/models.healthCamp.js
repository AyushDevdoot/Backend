const mongoose = require('mongoose');

const healthCampSchema = new mongoose.Schema({
    campName: {
        type: String,
        maxLength: 100,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    city: {
        type: String,
        maxLength: 100,
        required: true
    },
    state: {
        type: String,
        maxLength: 100,
        default: null
    },
    startDate: {
        type: String,
        requried: true
    },
    endDate: {
        type: String,
        requried: true
    },
    serviceOffered: {
        type: String,
        required: true
    },
    organizer: {
        type: String,
        maxLength: 100,
        required: true
    },
    contactInfo: {
        type: String,
        maxLength: 100,
        required: true
    },
    registrationLink: {
        type: String,
        require: true
    },
}, { timestamps: true });

const HealthCampModel = mongoose.model('healthcamp', healthCampSchema);

module.exports = HealthCampModel;