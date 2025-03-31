const mongoose = require('mongoose');

const insuranceProviderSchema = new mongoose.Schema({
    providerName: {
        type: String,
        maxLength: 100,
        required: true
    },
    providerContact: {
        type: String,
        maxLength: 100,
        required: true
    },
    coverageDetails: {
        type: String,
        required: true
    }
}, { timestamps: true });

const InsuranceProviderModel = mongoose.model('insuranceprovider', insuranceProviderSchema);

module.exports = InsuranceProviderModel;