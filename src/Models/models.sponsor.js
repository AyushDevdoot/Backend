const mongoose = require('mongoose');

const sponsorSchema = new mongoose.Schema({
    sponsorName: {
        type: String,
        maxLength: 100,
        required: true
    },
    contactInfo: {
        type: String,
        maxLength: 100,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    sponsorType: {
        type: String,
        enum: ["individual", "organization"],
        default: "government"
    },
    registrationDate: {
        type: String,
        required: true
    },
}, { timestamps: true });

const SponsorModel = mongoose.model('sponsor', sponsorSchema);

module.exports = SponsorModel;