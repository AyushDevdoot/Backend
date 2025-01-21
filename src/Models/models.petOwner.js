const mongoose = require('mongoose');

const petOwnerSchema = new mongoose.Schema({
    ownerName: {
        type: String,
        maxLength: 100,
        required: true
    },
    contactInfo: {
        type: String,
        maxLength: 100,
        required: true
    },
    address: {
        type: String,
        required: true
    }
}, { timestamps: true });

const PetOwnerModel = mongoose.model('petowner', petOwnerSchema);

module.exports = PetOwnerModel;