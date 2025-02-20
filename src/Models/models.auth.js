const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
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
    user: {
        type: String, //ref // user or coach 
        required: true,
        enum: ["care-giver", "patient"]
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    }
}, { timestamps: true });
const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel;
