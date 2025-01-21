const mongoose = require('mongoose');

const petVaccinationRecordsSchema = new mongoose.Schema({
    petId: {
        type: String,
        ref: "petinfo",
        required: true
    },
    vaccinationName: {
        type: String,
        maxLength: 100,
        required: true
    },
    vaccinationDate: {
        type: String,
        required: true
    },
    nextDueDate: {
        type: String,
        required: true
    }
}, { timestamps: true });

const PetVaccinationRecordsModel = mongoose.model('petvaccinationrecords', petVaccinationRecordsSchema);

module.exports = PetVaccinationRecordsModel;