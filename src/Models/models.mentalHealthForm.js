const mongoose = require('mongoose');

const mentalHealthFormSchema = new mongoose.Schema({
    language: {
        type: String,
        required: true,
        enum: ["hindi", "marathi", "tamil", "telugu", "bengali", "kannada"],
    },
    name: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    preferredLanguage: {
        type: String,
        required: true,
        enum: ["hindi", "marathi", "tamil", "telugu", "bengali", "kannada"],
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

const MentalHealthFormModel = mongoose.model('mentalhealthform', mentalHealthFormSchema);

module.exports = MentalHealthFormModel;