const mongoose = require('mongoose');

const healthCheckupTestSchema = new mongoose.Schema({
    testName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
}, { timestamps: true });

const HealthCheckupTestModel = mongoose.model('healthcheckuptest', healthCheckupTestSchema);

module.exports = HealthCheckupTestModel;