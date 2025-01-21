const mongoose = require('mongoose');

const homeHealthCheckupReqSchema = new mongoose.Schema({
    packageId: {
        type: String,
        ref: 'homehealthpackage',
        required: true
    },
    name: {
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
        enum: ["received", "payment-pending", "request-confirmed", "cancelled-customer", "cancelled-admin"],
        required: true,
        default: "received"
    },
    createdBy: {
        type: String,
        ref: 'user',
        required: true
    },
}, { timestamps: true });

const homeHealthCheckupReqModel = mongoose.model('homehealthcheckupreq', homeHealthCheckupReqSchema);

module.exports = homeHealthCheckupReqModel;