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
        enum: ["health-fitness", "chronic-diseases", "sleep-wellness", "holistic-wellness", "stem-skills", "parenting", "worklife-balance", "immunity-coach"],
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
