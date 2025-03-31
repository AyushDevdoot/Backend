const mongoose = require('mongoose');

const campServicesSchema = new mongoose.Schema({
    campId: {
        type: String,
        ref: "healthcamp",
        required: true
    },
    serviceName: {
        type: String,
        maxLength: 100,
        required: true
    },
    serviceType: {
        type: String,
        maxLength: 50,
        required: true
    },
    startTime: {
        type: String,
        reqired: true
    },
    endTime: {
        type: String,
        reqired: true
    }
}, { timestamps: true });

const CampServicesModel = mongoose.model('campservices', campServicesSchema);

module.exports = CampServicesModel;