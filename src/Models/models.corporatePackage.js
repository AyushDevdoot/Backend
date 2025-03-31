const mongoose = require('mongoose');

const corporatePackageSchema = new mongoose.Schema({
    packageName: {
        type: String,
        required: true
    },
    packageItems: {
        type: [String],
        required: true
    },
    pricePerYear: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    createdBy: {
        type: String,
        ref: 'user',
        required: true
    },
}, { timestamps: true });

const CorporatePackageModel = mongoose.model('corporatepackage', corporatePackageSchema);

module.exports = CorporatePackageModel;