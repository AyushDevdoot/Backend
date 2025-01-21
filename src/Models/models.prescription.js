const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    imgUrl: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        ref: 'user',
        required: true,
    },

}, { timestamps: true });

const PrescriptionModel = mongoose.model('prescription', prescriptionSchema);

module.exports = PrescriptionModel;