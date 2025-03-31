const mongoose = require('mongoose');

const medicalEquipmentFormSchema = new mongoose.Schema({
    patientName: {
        type: String,
        required: true,
    },
    currentLocation: {
        type: String,
        required: true,
    },
    equimentDetails: {
        type: String,
        enum: ["x-ray-machine", "mri-machine", "ct-scanner", "ultrasound-machine", "ecg-machine"],
        required: true,
    },
    mobile: {
        type: String,
        required: true,
    },
    numberOfDays: {
        type: String,
        required: true,
    },
    createdBy: {
        type: String,
        ref: 'User',
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ["received", "payment-pending", "request-confirmed", "cancelled-customer", "cancelled-admin"],
        default: "received"
    }
}, { timestamps: true });

const MedicalEquipmentFormModel = mongoose.model('medicalEquipmentForm', medicalEquipmentFormSchema);

module.exports = MedicalEquipmentFormModel;
