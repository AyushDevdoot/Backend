const mongoose = require('mongoose');

const firstAidProviderSchema = new mongoose.Schema({
    fullName: {
        type: String,
        maxLength: 100,
        required: true
    },
    currentLocation: {
        type: String,
        required: true
    },
    typeOfTraining: {
        type: String,
        enum: ["cpr", "basic-first-aid", "other"],
        required: true
    },
    previousTraining: {
        type: String,
        default: null
    },
    medicalCondition: {
        type: String,
        default: null
    },
    phoneNumber: {
        type: String,
        requried: true
    },
    email: {
        type: String,
        requried: true
    },
    certificationStatus: {
        type: Boolean,
        required: true,
        default: false
    },
    certificationExpiryDate: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true });

const FirstAidProviderModel = mongoose.model('firstaidprovider', firstAidProviderSchema);

module.exports = FirstAidProviderModel;