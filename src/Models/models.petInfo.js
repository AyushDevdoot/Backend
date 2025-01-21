const mongoose = require('mongoose');

const petInfoSchema = new mongoose.Schema({
    ownerId: {
        type: String,
        ref: "petowner",
        required: true
    },
    petName: {
        type: String,
        maxLength: 100,
        required: true
    },
    petType: {
        type: String,
        enum: ["cat", "dog", "other"],
        required: true
    },
    breed: {
        type: String,
        maxLength: 100,
        requried: true
    },
    age: {
        type: Number,
        required: true
    },
    lastVaccinationDate: {
        type: String,
        required: true
    },
    additionalInfo: {
        type: String,
        required: true
    }
}, { timestamps: true });

const PetInfoModel = mongoose.model('petinfo', petInfoSchema);

module.exports = PetInfoModel;