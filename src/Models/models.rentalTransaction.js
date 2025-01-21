const mongoose = require('mongoose');

const rentalTransactionSchema = new mongoose.Schema({
    equipmentId: {
        type: String,
        ref: "equipment",
        required: true
    },
    customerId: {
        type: String,
        ref: "customerinfo",
        required: true
    },
    rentalStartDate: {
        type: String,
        required: true
    },
    rentalEndDate: {
        type: String,
        required: true
    },
    totalRentalPrice: {
        type: Number,
        required: true
    },
    rentalStatus: {
        type: String,
        enum: ["ongoing", "completed", "cancelled"],
        required: true
    }
}, { timestamps: true });

const RentalTransactionModel = mongoose.model('rentaltransaction', rentalTransactionSchema);

module.exports = RentalTransactionModel;
