const mongoose = require('mongoose');

const healthPackageDetailsSchema = new mongoose.Schema({
    packageId: {
        type: String,
        ref: "corporatehealthpackage",
        required: true
    },
    serviceName: {
        type: String,
        required: true
    },
    frequency: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, { timestamps: true });

const HealthPackageDetailsModel = mongoose.model('healthpackagedetail', healthPackageDetailsSchema);

module.exports = HealthPackageDetailsModel;