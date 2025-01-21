const mongoose = require('mongoose');

const rentalEquipmentConditionSchema = new mongoose.Schema({
    rentalId: {
        type: String,
        ref: "rentaltransaction",
        required: true
    },
    equipmentId: {
        type: String,
        ref: "equipment",
        required: true
    },
    conditionNotes: {
        type: String,
        required: true
    }
}, { timestamps: true });

const RentalEquipmentConditionModel = mongoose.model('rentalequipmentcondition', rentalEquipmentConditionSchema);

module.exports = RentalEquipmentConditionModel;