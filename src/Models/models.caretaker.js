const mongoose = require('mongoose');

const caretakerSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        require: true
    },
    mobile: {
        type: String,
        requried: true
    },
    whatsappNumber: {
        type: String,
        default: 0
    },
    experience: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    availabilityStatus: {
        type: String,
        enum: ["available", "busy", "unavailable"],
        required: true
    },
    rating: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true });

const CaretakerModel = mongoose.model('caretaker', caretakerSchema);

module.exports = CaretakerModel;