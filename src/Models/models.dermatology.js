const mongoose = require('mongoose');

const dermatologySchema = new mongoose.Schema({
    serviceName: {
        type: String,
        maxLength: 100,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const DermatologyModel = mongoose.model('dermatology', dermatologySchema);

module.exports = DermatologyModel;