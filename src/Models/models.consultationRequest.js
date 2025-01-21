const mongoose = require('mongoose');

const consultationRequestSchema = new mongoose.Schema({
    userId: {
        type: String,
        ref: 'user',
        required: true
    },
    dietitianId: {
        type: String,
        ref: 'dietitianinfo',
        required: true
    },
    serviceType: {
        type: String,
        enum: ["custom-diet", "expert-consultation"],
        required: true
    },
    reqDate: {
        type: String,
        required: true
    },
    consultationDate: {
        type: String,
        required: true,
    },
    preferredConsultationMode: {
        type: String,
        enum: ["in-person", "online"],
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "confirmed", "completed"],
        required: true
    }
},
    { timestamps: true });

const ConsultationRequestModel = mongoose.model('consultationrequest', consultationRequestSchema);

module.exports = ConsultationRequestModel;