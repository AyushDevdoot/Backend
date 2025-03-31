const mongoose = require('mongoose');

const childHealthSponsorshipSchema = new mongoose.Schema({
    childName: {
        type: String,
        maxLength: 100,
        required: true
    },
    childAge: {
        type: Number,
        required: true
    },
    childHealthCondition: {
        type: String,
        maxLength: 100,
        required: true
    },
    sponsorId: {
        type: String,
        ref: "sponsor",
        required: true
    },
    sponsorshipStartDate: {
        type: String,
        required: true
    },
    sponsorshipEndDate: {
        type: String,
        required: true
    },
    amountSponsored: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "completed", "cancelled"],
        required: true
    }
}, { timestamps: true });

const ChildHealthSponsorshipModel = mongoose.model('childhealthsponsorship', childHealthSponsorshipSchema);

module.exports = ChildHealthSponsorshipModel;
