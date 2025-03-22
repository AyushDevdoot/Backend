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
}, {timestamps: true});

module.exports = mongoose.model('medicalDocuments', medicalDocSchema);