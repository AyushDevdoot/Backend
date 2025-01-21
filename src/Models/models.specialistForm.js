const mongoose = require('mongoose');

const specialistFormSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["received", "payment-pending", "request-confirmed", "cancelled-customer", "cancelled-admin"],
        default: "received"
    },
    mobile: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true
    },
    preferredDate: {
        type: String,
        required: true
    },
    preferredTime: {
        type: String,
        required: true
    },
    specialNotes: {
        type: String,
    },
    specialistId: {
        type: String,
        required: true,
        ref: 'specialistdetail'
    },
    createdBy: {
        type: String,
        ref: 'user',
        required: true
    },
}, { timestamps: true });

const SpecialistFormModel = mongoose.model('specialistform', specialistFormSchema);

module.exports = SpecialistFormModel;