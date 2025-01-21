const mongoose = require('mongoose');

const healthCheckupPackageSchema = new mongoose.Schema({
    packageName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: null
    },
    price: {
        type: Number,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    validityPeriod: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["basic", "heart"],
        required: true
    }
}, { timestamps: true });

const HealthCheckupPackageModel = mongoose.model('healthcheckuppackage', healthCheckupPackageSchema);

module.exports = HealthCheckupPackageModel;