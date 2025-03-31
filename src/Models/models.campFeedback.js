const mongoose = require('mongoose');

const campFeedbackSchema = new mongoose.Schema({
    campId: {
        type: String,
        ref: "healthcamp",
        required: true
    },
    userId: {
        type: String,
        ref: "user",
        required: true
    },
    comments: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        default: 0,
        max: 5,
        min: 0,
        required: true
    }
}, { timestamps: true });

const CampFeedbackModel = mongoose.model('campfeedback', campFeedbackSchema);

module.exports = CampFeedbackModel;