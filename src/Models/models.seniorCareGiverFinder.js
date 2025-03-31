const mongoose = require('mongoose');

const seniorCareGiverFinderSchema = new mongoose.Schema({
    seniorCareType: {
        type: String,
        required: true,
        enum: ["in-home", "senior", "not-sure"],
    },
    seniorCareNeededFor: {
        type: String,
        required: true,
        enum: ["parents", "myself", "spouse", "other"],
    },
    age: {
        type: String,
        required: true
    },
    serviceRequired: {
        type: [String],
        required: true,
        // values are from ["everyday","personalcare","companionship","mobility","memorycare","newtechnology"]
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

const seniorCareGiverFinderModel = mongoose.model('seniorcaregiverfinder', seniorCareGiverFinderSchema);

module.exports = seniorCareGiverFinderModel;