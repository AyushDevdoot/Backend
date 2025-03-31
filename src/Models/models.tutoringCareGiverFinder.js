const mongoose = require('mongoose');

const tutoringCareGiverFinderSchema = new mongoose.Schema({
    tutorLevelRequired: {
        type: String,
        required: true,
        enum: ["adult", "college", "highschool", "middleschool", "elementaryschool"],
    },
    subject: {
        type: [String],
        required: true,
        // values cam be select from this value ["arts","business","computer","dance","other"]
    },
    tutoringPreference: {
        type: String,
        required: true,
        enum: ["online", "in-person", "either"],
    },
    userDescription: {
        type: String,
        required: true,
        enum: ["independent", "needs-monitoring", "requiring-supervision", "not-sure"],
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

const tutoringCareGiverFinderModel = mongoose.model('tutoringcaregiverfinder', tutoringCareGiverFinderSchema);

module.exports = tutoringCareGiverFinderModel;