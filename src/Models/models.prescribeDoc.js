const mongoose = require('mongoose');

const prescribeDocSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    patientName: {
        type: String,
        required: true
    },
    prescriptionUrl: {
        type: String,
        required: true
    },
    uploadDate: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const prescribeDocModel = mongoose.model('PrescribeDoc', prescribeDocSchema);

module.exports = prescribeDocModel;