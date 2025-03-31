const mongoose = require('mongoose');

const reproWellFormSchema = new mongoose.Schema({
    doctorName: {
        type: String,
        required: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
        match: /^\+?[1-9]\d{1,14}$/, // Validates international phone numbers (E.164 format)
    },
    age: {
        type: Number,
        min: 1,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male','Female','other'],
        required: true,
    },
    preferredDate: {
        type: Date,
    },
    preferredTime: {
        type: String,
    },
    notes: {
        type: String,
    },
    location: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        ref: 'user',
        required: true,
    }
}, {timestamps: true});

module.exports = mongoose.model('reprowellforms', reproWellFormSchema);