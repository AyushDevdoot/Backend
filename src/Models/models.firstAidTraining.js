const mongoose = require('mongoose');

const firstAidTrainingSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    currentLocation: {
        type: String,
        required: true,
    },
    trainingType: {
        type: String,
        required: true,
        enum: ["first-aid", "first-aid-training", "basic-first-aid", "advanced-first-aid"],
    },
    previousTraining: {
        type: String,
        required: true,
        enum: ["first-aid", "first-aid-training", "basic-first-aid", "advanced-first-aid", "other", "NA"],
    },
    mobile: {
        type: String,
        required: true,
    },
    medicalCondition: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        ref: 'user',
        required: true,
    },
}, { timestamps: true });

const FirstAidTrainingModel = mongoose.model('firstaidtraining', firstAidTrainingSchema);

module.exports = FirstAidTrainingModel;