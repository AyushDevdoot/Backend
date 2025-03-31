const mongoose = require('mongoose');

const corporatePackageRequestSchema = new mongoose.Schema({
    packageId: {
        type: String,
        ref: 'corporatepackage',
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    preferredStartDate: {
        type: String,
        required: true
    },
    preferredStartTime: {
        type: String,
        required: true
    },
    specialNotes: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        enum: ["received", "payment-pending", "request-confirmed", "cancelled-customer", "cancelled-admin"],
        default: "received"
    },
    createdBy: {
        type: String,
        ref: 'user',
        required: true
    },
}, { timestamps: true });

const CorporatePackageRequestModel = mongoose.model('corporatepackagerequest', corporatePackageRequestSchema);

module.exports = CorporatePackageRequestModel;