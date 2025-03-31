const mongoose = require('mongoose');

const mentalHealthSupportSchema = new mongoose.Schema({
    category: {
        type: String,
        enum: ["stress", "anxiety", "depression", "other"],
        required: true
    },
    contentHindi: {
        type: String,
        default: null
    },
    contentMarathi: {
        type: String,
        default: null
    },
    contentTamil: {
        type: String,
        default: null
    },
    contentTelugu: {
        type: String,
        default: null
    },
    contentBengali: {
        type: String,
        default: null
    },
    contentKannada: {
        type: String,
        default: null
    }

}, { timestamps: true });

const MentalHealthSupportModel = mongoose.model('mentalhealthsupport', mentalHealthSupportSchema);

module.exports = MentalHealthSupportModel;