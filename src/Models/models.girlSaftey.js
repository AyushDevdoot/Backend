const mongoose = require('mongoose');

const girlSafteySchema = new mongoose.Schema({
    participantName: {
        type: String,
        required: true
    },
    participantEmail: {
        type: String,
        required: true
    },
    participantPhone: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    preferredStartDate: {
        type: String,
        required: true
    },
    guardianPhone: {
        type: String,
        required: true
    },
    guardianEmail: {
        type: String,
        required: true
    },
    programModule: {
        type: String,
        enum: ["self-defense", "hygine", "sanitary-products", "health-safety", "medical-assistance-guidance"],
        required: true
    },
    category: {
        type: String,
        enum: ["self-defense", "hygine", "sanitary-products", "health-safety", "medical-assistance-guidance"],
        required: true
    },
    createdBy: {
        type: String,
        ref: 'user',
        required: true
    },
    status: {
        type: String,
        enum: ["received", "payment-pending", "request-confirmed", "cancelled-customer", "cancelled-admin"],
        required: true,
        default: "received"
    },
    specialNotes: {
        type: String,
    },
    // you can delete this fields if you don't need them
    // preferredTime: {
    //     type: String,
    //     requried: true
    // },
    // location: {
    //     type: String,
    //     required: true
    // },
    // emergencyContact: {
    //     type: String,
    //     required: true
    // },
    // allergiesOrMedical: {
    //     type: String,
    //     required: true
    // },
    // consent: {
    //     type: Boolean,
    //     required: true
    // },
    // registeredAt: {
    //     type: String,
    //     required: true
    // }
}, { timestamps: true });

const GirlSafteyModel = mongoose.model('girlsaftery', girlSafteySchema);

module.exports = GirlSafteyModel;