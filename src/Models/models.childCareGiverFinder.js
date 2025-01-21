const mongoose = require('mongoose');

const childCareGiverFinderSchema = new mongoose.Schema({
    careGiverType: {
        type: String,
        required: true,
        enum: ["nannies", "onetimesitter", "daycare"],
    },
    childDetails: {
        type: [String],
        required: true
    },
    careLocation: {
        type: String,
        required: true
    },
    careTime: {
        type: String,
        required: true,
        enum: ["rightnow", "withinaweek", "in2months", "justbrowsing"],
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    specialNotes: {
        type: String,
    },
    createdBy: {
        type: String,
        ref: 'user',
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["received", "payment-pending", "request-confirmed", "cancelled-customer", "cancelled-admin"],
        default: "received"
    },
}, { timestamps: true });

const childCareGiverFinderModel = mongoose.model('childcaregiverfinder', childCareGiverFinderSchema);

module.exports = childCareGiverFinderModel;