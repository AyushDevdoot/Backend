const mongoose = require('mongoose');

const dietaryPreferenceSchema = new mongoose.Schema({
    preferenceName: {
        type: String,
        required: true
    },
}, { timestamps: true });

const dietaryPreferenceModel = mongoose.model('dietarypreference', dietaryPreferenceSchema);

module.exports = dietaryPreferenceModel;