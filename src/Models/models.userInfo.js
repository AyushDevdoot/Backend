const mongoose = require('mongoose');

const UserInfoSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    mobile: {
        type: String,
        maxlength: 15,
        required: true,
        match: [/^[1-9]\d{1,14}$/, 'Please provide a valid mobile number'],     
    },
    profilePhoto: {
        type: String,
    },
    bio: {
        type: String,
        maxlength: 500, 
    },
    rating: {
        type: Number,
        default: 0,
        min: 0, 
        max: 5, 
    },
    amountSpend: {
        type: Number,
        min: 0, 
        default: 0,
    },
    languages: {
        type: [String], // Store languages as an array (e.g., ["English", "Spanish"])
    },
    countryCode: {
        type: String,
        maxlength: 4,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    currency: {
        type: String,
        enum: ['USD', 'INR'],
        default: 'USD', // Standardize currency code (ISO 4217)
    },
    address: {
        type: String,
        maxlength: 255, 
    },
    timeZone: {
        type: String,
        default: 'utc'
    },
    subscriptionStatus: {
        type: String,
        enum: ['active', 'inactive', 'pending'],
        default: 'inactive',
    },
}, { timestamps: true });


UserInfoSchema.index({mobile: 1})
// Model creation
const UserInfoModel = mongoose.model('userinfo', UserInfoSchema);
module.exports = UserInfoModel;
