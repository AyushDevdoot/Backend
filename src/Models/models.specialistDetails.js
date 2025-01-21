const mongoose = require('mongoose');
const { specialistEnums } = require('../Helpers/helpers.constant');

const specialistDetailsSchema = new mongoose.Schema({
    specialistServiceCategory: {
        type: String,
        required: true,
        enum: specialistEnums


    },
    specialistServiceType: {
        type: String,
        required: true,
        enum: ["consultation", "training", "counselling", "referral", "other"]
    },
    name: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    profileDescription: {
        type: String,
        required: true
    },
    servicesOffered: {
        type: [String],
        required: true
    },
    rate: {
        type: String,
        required: true,
        default: 0
    },
    yearsOfExperience: {
        type: String,
        required: true,
        default: 0
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    createdBy: {
        type: String,
        ref: 'user',
        required: true
    },
}, { timestamps: true });

const SpecialistDetailsModel = mongoose.model('specialistdetail', specialistDetailsSchema);

module.exports = SpecialistDetailsModel;