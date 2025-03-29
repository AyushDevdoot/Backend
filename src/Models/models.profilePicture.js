const mongoose = require('mongoose');

const profilePictureSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Reference to the User model
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
    },
    uploadType: {
        type: String,
        required: true,
        enum: ['profile-picture'],
    }
}, {timestamps: true});

module.exports = mongoose.model('profilePictures', profilePictureSchema);
