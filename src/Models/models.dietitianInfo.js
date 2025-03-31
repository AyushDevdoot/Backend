const mongoose = require('mongoose');

const dietitianInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    contactInfo: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
}, { timestamps: true });

const DietCounsellingModel = mongoose.model('dietitianinfo', dietitianInfoSchema);

module.exports = DietCounsellingModel;