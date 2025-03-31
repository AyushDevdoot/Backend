const mongoose = require('mongoose');

const isValidGoogleDriveLink = (url) => {
    const driveRegex = /^https?:\/\/(drive\.google\.com\/(?:file\/d\/|open\?id=))[a-zA-Z0-9_-]+/;
    return driveRegex.test(url);
};

const coachInfoSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
<<<<<<< HEAD
=======
        enum:[
            "Addiction Recovery Coach",
            "Arthritis and Joint Health Coach",
            "Ayurveda Consultant",
            "Cardiovascular Health Coach",
            "Chronic Pain Management Coach",
            "Dermatologist Consultant",
            "Detox and Clean Eating Coach",
            "Diabetes Management Coach",
            "Health & Fitness Coach",
            "Holistic Wellness Coach",
            "Immunity Coach for Kids",
            "Lifestyle Transformation Coach",
            "Mental Health Support Coach",
            "Parenting Wellness Coach",
            "Post-Surgery Recovery Coach",
            "Relationship and Couples Coach",
            "Reproductive Health Coach",
            "Skin and Beauty Wellness Coach",
            "Sleep Wellness Coach",
            "Therapeutic Coach",
            "Weight Management Coach",
            "Women’s Health Coach",
            "Work-Life Balance Coach",
            "Workplace Stress Coach"
          ]
          
          ,
>>>>>>> origin/main
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
    certification :{
        type: String,
        required: false,
        validate: {
            validator: isValidGoogleDriveLink,
            message: 'Certification link must be a valid Google Drive link.'
        }
    }
}, { timestamps: true });


coachInfoSchema.index({mobile: 1})
const CoachInfoModel = mongoose.model('coachinfo', coachInfoSchema);

module.exports = CoachInfoModel;
