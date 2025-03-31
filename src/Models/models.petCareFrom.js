const mongoose = require('mongoose');

const petCareFormSchema = new mongoose.Schema({
    serviceType: {
        type: String,
        required: true,
        enum: ["veterinary", "nutrition", "emergency", "pet-boarding", "grooming", "training"],
    },
    petType: {
        type: String,
        required: true,
        enum: ["dog", "cat", "other"],
    },
    petName: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    lastVaccinationDate: {
        type: String,
        required: true,
    },
    additionalInfo: {
        type: String,
    },
    createdBy: {
        type: String,
        ref: 'user',
        required: true,
    },
}, { timestamps: true });

const PetCareFormModel = mongoose.model('petcareform', petCareFormSchema);

module.exports = PetCareFormModel;