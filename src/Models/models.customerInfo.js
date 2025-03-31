const mongoose = require('mongoose');

const customerInfoSchema = new mongoose.Schema({
    customerName: {
        type: String,
        maxLength: 100,
        required: true
    },
    contactNumber: {
        type: String,
        maxLength: 15,
        required: true
    },
    email: {
        type: String,
        maxLength: 100,
        required: true
    },
    address: {
        type: String,
        reuqired: true,
        default: null
    }
}, { timestamps: true });

const CustomerInfoModel = mongoose.model('customerinfo', customerInfoSchema);

module.exports = CustomerInfoModel;