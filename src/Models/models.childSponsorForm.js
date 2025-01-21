const mongoose = require('mongoose');

const childSponsorFormSchema = new mongoose.Schema({
    childId: {
        type: String,
        ref: "childsponsor",
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
    notes: {
        type: String,
    },
    createdBy: {
        type: String,
        ref: 'user',
        required: true
    },
    status: {
        type: String,
        required: true,
        enum: ["received", "payment-pending", "request-confirmed", "cancelled-customer", "cancelled-admin"],
        default: "received"
    }
}, { timestamps: true });

const ChildSponsorFormModel = mongoose.model('childsponsorform', childSponsorFormSchema);

module.exports = ChildSponsorFormModel;