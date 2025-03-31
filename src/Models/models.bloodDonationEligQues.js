const mongoose = require('mongoose');

const bloodDonationEligQuesSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: "user",
        required: true
    },
    ageEligibility: {
        type: Boolean,
        required: true,
        default: true
    },
    weightEligibility: {
        type: Boolean,
        required: true,
        default: true
    },
    healthEligibility: {
        type: Boolean,
        required: true,
        default: true
    },
    donationRecently: {
        type: Boolean,
        default: false
    },
    preferredDate: {
        type: String,
        required: true
    },
    preferredTime: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        requried: true
    }
}, { timestamps: true });

const BloodDonationEligQuesModel = mongoose.model('blooddonationeligques', bloodDonationEligQuesSchema);

module.exports = BloodDonationEligQuesModel;