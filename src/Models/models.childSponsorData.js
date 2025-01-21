const mongoose = require('mongoose');

const childSponsorDataSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    profileImg: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        ref: 'user',
        required: true
    },
}, { timestamps: true });

const ChildSponsorDataModel = mongoose.model('childsponsor', childSponsorDataSchema);

module.exports = ChildSponsorDataModel;