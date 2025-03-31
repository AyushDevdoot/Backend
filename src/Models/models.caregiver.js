const mongoose = require('mongoose');

const caregiverSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: "user",
        required: true
    },
    aadharLink: {
        type: String,
        default: null
    },
}, { timestamps: true });

const CaregiverModel = mongoose.model('caregiver', caregiverSchema);

module.exports = CaregiverModel;