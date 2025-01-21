const mongoose = require('mongoose');

const petServiceTypeSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        maxLength: 100,
        enum: ["veterinary", "pet-grooming", "nutirition-consultant", "behaviour-training", "emergency-services", "pet-boarding"],
        required: true
    },
    serviceDescription: {
        type: String,
        required: true
    },
}, { timestamps: true });

const PetServiceTypeModel = mongoose.model('petservicetype', petServiceTypeSchema);

module.exports = PetServiceTypeModel;
