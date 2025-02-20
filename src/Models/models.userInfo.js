const mongoose = require('mongoose');

const UserInfoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        maxlength: 15,
        required: true,
    },
    profilePhoto: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    sessions:{
        type:Number,
        required:true,
        default:60
    },
    amountSpend: {
        type: Number,
        required: true
    },
    languages: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true,
    },
    countryCode: {
        type: String,
        maxlength: 4,
    },
    certificate: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    currency: {
	    type: String,
	    default: 'Inr'
    },
}, { timestamps: true });

const UserInfoModel = mongoose.model('userinfo', UserInfoSchema);

module.exports = UserInfoModel;
