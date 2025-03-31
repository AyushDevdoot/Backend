const mongoose = require('mongoose');

const petCareGiverFinderSchema = new mongoose.Schema({
    petRequired: {
        type: {
            dogs: {
                type: Number,
                required: true,
                default: 0
            },
            cats: {
                type: Number,
                required: true,
                default: 0
            },
            others: {
                type: Number,
                required: true,
                default: 0
            },
            _id: false
        },
        required: true,
    },
    serviceRequired: {
        type: [String],
        required: true,
        // enum: ["sitting", "boarding", "walking", "grooming", "training"]
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

const petCareGiverFinderModel = mongoose.model('petcaregiverfinder', petCareGiverFinderSchema);

module.exports = petCareGiverFinderModel;