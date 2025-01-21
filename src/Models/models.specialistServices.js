const mongoose = require('mongoose');

const specialistServicesSchema = new mongoose.Schema({
    serviceName: {
        type: String,
        maxLength: 100,
        required: true
    },
    specialistId: {
        type: String,
        ref: "specialistdetails",
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, { timestamps: true });

const SpecialistServicesModel = mongoose.model('specialistservices', specialistServicesSchema);

module.exports = SpecialistServicesModel;