const mongoose = require('mongoose');

const emergencyContactSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: "user",
        required: true
    },
    contactName: {
        type: String,
        required: true
    },
    relationship: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        require: true
    },
    address: {
        type: String,
        required: true
    },
    isPrimary: {
        type: Boolean,
        required: true,
        default: true
    },
    priorityLevel: {
        type: Number,
        required: true,
        default: 0
    }
});

const EmergencyContactModel = mongoose.model('emergencycontact', emergencyContactSchema);

module.exports = EmergencyContactModel;