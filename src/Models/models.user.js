const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    emailOtp: {
        type: String,
        required: true
    },
    whatsappNumber: {
        type: String,
        default: 0
    },
    userType: {
        type: String,
        required: true,
        enum: ["care-giver", "patient"]
    },
    coachType: {
        type: String,
        enum: ["child care", "pet care", "virtual coach", "senior care", "tutoring"],
        validate: {
            validator: function (value) {
                if (this.userType === "care-giver") {
                    return Boolean(value); 
                }
                return true; 
            },
            message: "CoachType is required when userType is 'care-giver'.",
        },
        default: undefined,
    },

    isVerified: {
        type: Boolean,
        required: true,
        default: false
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true });
const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;