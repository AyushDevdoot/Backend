const mongoose = require('mongoose');

const isValidGoogleDriveLink = (url) => {
    const driveRegex = /^https?:\/\/(drive\.google\.com\/(?:file\/d\/|open\?id=))[a-zA-Z0-9_-]+/;
    return driveRegex.test(url);
};

const coachInfoSchema = new mongoose.Schema({
    coachName: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
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
        required: true
    },
    contactInfo: {
        type: String,
        required: true
    },
    profilePhoto: {
        type: String,
        required: true
    },
    experienceYear: {
        type: Number,
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
    sessionTime:{
        type:Number,
        required:true,
        default:60
    },
    pricePerMinute: {
        type: Number,
        required: true
    },
    languages: {
        type: [String],
        required: true
    },
    createdBy: {
        type: String,
        ref: "user",
        required: true
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    currency: {
	type: String,
	default: 'Inr'
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

const CoachInfoModel = mongoose.model('coachinfo', coachInfoSchema);

module.exports = CoachInfoModel;
