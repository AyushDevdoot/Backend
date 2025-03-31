const mongoose = require('mongoose');

const homeHealthCheckupSchema = new mongoose.Schema({
    packageName: {
        type: String,
        required: true
    },
    packageItems: {
        type: [String],
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    createdBy: {
        type: String,
        ref: 'user',
        required: true
    },
}, { timestamps: true });

const homeHealthCheckupModel = mongoose.model('homehealthpackage', homeHealthCheckupSchema);

module.exports = homeHealthCheckupModel;