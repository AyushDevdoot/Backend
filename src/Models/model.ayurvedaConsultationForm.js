const mongoose = require('mongoose');

const ayurvedaConsultationFormSchema = new mongoose.Schema({
    consultationType: {
        type: String,
        required: true,
        enum: ["ayurvedic", "herbal", "dosha"],
    },
    name: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    doshaType: {
        type: String,
        required: true,
        enum: ["vegetarian", "non-vegetarian"],
    },
    healthConcern: {
        type: String,
    },
    createdBy: {
        type: String,
        ref: 'user',
        required: true,
    },
}, { timestamps: true });

const AyurvedaConsultationFormModel = mongoose.model('ayurvedaconsultationform', ayurvedaConsultationFormSchema);

module.exports = AyurvedaConsultationFormModel;