const mongoose = require('mongoose');

const profilePictureSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Reference to the User model
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    pictureUrl: {
        type: String,
        required: true,
    },
}, {timestamps: true});

module.exports = mongoose.model('profilePictures', profilePictureSchema);