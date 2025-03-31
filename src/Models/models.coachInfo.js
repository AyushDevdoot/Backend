const mongoose = require('mongoose');

const coachInfoSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    specialization: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Specialization', // Reference to specialization model
        required: true
    }],
    mobile: {
        type: String,
        maxlength: 15,
        required: true,
        match: [/^[1-9]\d{1,14}$/, 'Please provide a valid mobile number'],
    },
    profilePhoto: {
        type: String,
    },
    experienceYear: {
        type: Number,
        min: 0,
        max: 90,
    },
    bio: {
        type: String,
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5,
    },
    sessionTime: {
        type: Number,
        default: 60,
    },
    pricePerSession: {
        type: Number,
        min: 0,
    },
    languages: {
        type: [String],
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
        enum: ['USD', 'INR'],
        default: 'USD'
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


coachInfoSchema.index({mobile: 1})
const CoachInfoModel = mongoose.model('coachinfo', coachInfoSchema);

module.exports = CoachInfoModel;
