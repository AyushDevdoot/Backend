const mongoose = require('mongoose');

const medicalDocSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'users',
    },
    documentName: {
        type: String,
        required: true,
    },
    pdfUrl: {
        type: String,
        required: true,
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
}, {timestamps: true});

module.exports = mongoose.model('medicalDocuments', medicalDocSchema);