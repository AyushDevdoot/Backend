const mongoose = require('mongoose');

const treatmentTypeSchema = new mongoose.Schema({
    serviceId: {
        type: String,
        ref: "dermatology",
        required: true
    },
    treatmentName: {
        type: String,
        required: true
    },
    treatmentDuration: {
        type: String,
        required: true
    },
}, { timestamps: true });

const TreatmentTypeModel = mongoose.model('treatmenttype', treatmentTypeSchema);

module.exports = TreatmentTypeModel;