const mongoose = require('mongoose');

const petCareFormSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    vaccineType: {
        type: String,
        enum: ["vaccine", "injection", "tablet", "capsule", "other"],
        requried: true
    },
    preferredDate: {
        type: String,
        required: true,
    },
    additionalInfo: {
        type: String,
    },
    insuranceProvider: {
        type: String,
        required: true,
    },
    policyNumber: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        ref: 'user',
        required: true,
    },
    status: {
        type: String,
        enum: ["pending", "completed", "cancelled"],
        default: "pending"
    },
}, { timestamps: true });

const ImmunicareModel = mongoose.model('immunicare', petCareFormSchema);

module.exports = ImmunicareModel;
