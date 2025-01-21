const mongoose = require('mongoose');

const coachTimeslotSchema = new mongoose.Schema({
    coachId: {
        type: String,
        ref: "coachinfo",
        required: true
    },
    slot: {
        type: {
            monday: [String],
            tuesday: [String],
            wednesday: [String],
            thursday: [String],
            friday: [String],
            saturday: [String],
            sunday: [String]
        }
    },
    isActive: {
        type: Boolean,
        required: true,
        default: true
    },
    createdBy: {
        type: String,
        ref: "user",
        required: true
    }
}, { timestamps: true });

const CoachTimeslotModel = mongoose.model('coachtimeslot', coachTimeslotSchema);

module.exports = CoachTimeslotModel;