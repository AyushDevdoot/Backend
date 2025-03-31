const mongoose = require('mongoose');

const petServiceBookingSchema = new mongoose.Schema({
    petId: {
        type: String,
        ref: "petinfo",
        required: true
    },
    serviceId: {
        type: String,
        ref: "petservicetype",
        required: true
    },
    serviceDate: {
        type: String,
        required: true
    },
    additionalInfo: {
        type: String,
        required: true
    }
}, { timestamps: true });

const PetServiceBookingModel = mongoose.model('petservicebooking', petServiceBookingSchema);

module.exports = PetServiceBookingModel;
