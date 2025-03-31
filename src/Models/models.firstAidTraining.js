const mongoose = require('mongoose');
const { trainingTypeEnums, previousTrainingEnums} = require('../Helpers/helpers.constant');

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
        enum: trainingTypeEnums,
        required: true,
    },
    previousTraining: {
        type: String,
        enum: previousTrainingEnums,
        required: true,
    },
    certificateStatus: {
        type: String,
        enum: [
            "Active", "Expired", "Renewal Required", "Pending Certification", "No Certification"
        ],
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
        match: [/^\+?\d{10,15}$/, "Please enter a valid mobile number"]
    },
    trainingMode: {
        type: String,
        enum: ["Virtual", "Physical"],
        required: true,
    },
    medicalConditions: {
        type: String,
        enum: ["Yes", "No", "Not Aware"],
        required: true,
    },
    medicalConditionsDetails: {
        type: String,
        required: function () { return this.MedicalConditions === "Yes" }
    },
    createdBy: {
        type: String,
        ref: 'user',
        required: true,
    },
}, { timestamps: true });

const FirstAidTrainingModel = mongoose.model('firstaidtraining', firstAidTrainingSchema);

module.exports = FirstAidTrainingModel;