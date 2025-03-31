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
        type: String, // 24 hour format
        required: true,
    },
    endTime: {
        type: String, //24 hour format
        required: true,
    },
    isAvailable: {
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

availabilitySchema.index({coachId : 1, day: 1, startTime: 1, endTime: 1})
const CoachAvailabilityModel = mongoose.model('coachAvailability', availabilitySchema);

module.exports = CoachAvailabilityModel;
