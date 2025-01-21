const mongoose = require('mongoose');

const nutritionDietSchema = new mongoose.Schema({
    planType: {
        type: String,
        required: true,
        enum: ["custom", "expert"],
    },
    category: {
        type: String,
        required: true,
        enum: ["weight-loss", "muscle-gain", "diabetic", "lifestyle", "keto", "vegan", "nutrition"],
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
    dob: {
        type: String,
        required: true,
    },
    dietaryPreference: {
        type: String,
        enum: ["vegetarian", "vegan", "omnivore"],
        required: true
    },
    healthGoal: {
        type: String,
        enum: ["weight-loss", "muscle-gain"],
        required: true
    },
    dietician: {
        type: String,
        enum: ["yes", "no"],
        required: true
    },
    allergies: {
        type: String,
        enum: ["yes", "no"],
        required: true
    },
    preferredConsultationMode: {
        type: String,
        enum: ["in-person", "online"],
        required: true
    },
    specialistId: {
        type: String,
        ref: 'specialistdetail',
    },
    createdBy: {
        type: String,
        ref: 'user',
        required: true
    },
}, { timestamps: true });

const DietCounsellingModel = mongoose.model('nutrition', nutritionDietSchema);

module.exports = DietCounsellingModel;