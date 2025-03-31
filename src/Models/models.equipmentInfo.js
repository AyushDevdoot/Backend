const mongoose = require('mongoose');

const equipmentSchema = new mongoose.Schema({
    equipmentName: {
        type: String,
        maxLength: 100,
        required: true
    },
    category: {
        type: String,
        maxLength: 100,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    rentalPricePerDay: {
        type: Number,
        required: true
    },
    manufacturer: {
        type: String,
        maxLength: 100,
        required: true,
    },
    serialNumber: {
        type: String,
        required: true,
        maxLength: 100,
    },
    availabilityStatus: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true });

const EquipmentModel = mongoose.model('equipmentinfo', equipmentSchema);

module.exports = EquipmentModel;