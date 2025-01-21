const mongoose = require('mongoose');

const vaccineReqSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: "user",
        required: true
    },
    vaccineType: {
        type: String,
        maxLength: 100,
        required: true
    },
    doseNumber: {
        type: Number,
        required: true
    },
    preferredDate: {
        type: String,
        required: true
    },
    insuranceProvider: {
        type: String,
        ref: "insuranceprovider",
        required: true
    },
    status: {
        type: String,
        maxLength: 50,
        enum: ["pending", "completed"],
        required: true
    }
}, { timestamps: true });

const VaccineReqModel = mongoose.model('vaccinereq', vaccineReqSchema);

module.exports = VaccineReqModel;