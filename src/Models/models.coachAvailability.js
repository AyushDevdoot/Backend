const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//storing strictly availability on what day and time 
const availabilitySchema = new Schema({
    coachId: {
        type: Schema.Types.ObjectId,
        ref: 'coachinfo',
        required: true,
    },
    day: {
        type: String,
        required: true,
        enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    },
    startTime: {
        type: String,
        required: true,
    },
    endTime: {
        type: String,
        required: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

const CoachAvailabilityModel = mongoose.model('coachAvailability', availabilitySchema);

module.exports = CoachAvailabilityModel;
