const mongoose = require('mongoose');

const corporateHealthSchema = new mongoose.Schema({
    companyName: {
        type: String,
        maxLength: 100,
        required: true
    },
    packageType: {
        type: String,
        enum: ["wellness", "fitness"],
        required: true
    },
    totalEmployees: {
        type: Number,
        required: true
    },
    preferredStartDate: {
        type: String,
        required: true
    },
    preferredEndDate: {
        type: String,
        required: true
    },
    packageDuration: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["active", "completed"],
        required: true
    },
    services: {
        type: [String],
        required: true
    }
}, { timestamps: true });

const CorporateHealthModel = mongoose.model('corporatehealthpackage', corporateHealthSchema);

module.exports = CorporateHealthModel;