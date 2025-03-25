const mongoose = require('mongoose');

//this model handles locking of time slot for particular field 
const bookingProcessingSchema = new mongoose.Schema({
    bookingId: { type: mongoose.Schema.Types.ObjectId, ref: 'booking', required: true },
    coachId: { type: mongoose.Schema.Types.ObjectId, ref: 'coachInfo', required: true },
    startTime: {type: Date, required: true}, 
    endTime:  {type: Date, required: true},
    lockTimestamp: { type: Date, default: null }, // Timestamp when the lock was acquired
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});


// Set a TTL index on lockTimestamp field
bookingSchema.index({ lockTimestamp: 1 }, { expireAfterSeconds: 30 }); // Lock expires after 30 seconds

const BookingProcessing = mongoose.model('BookingProcessing', bookingProcessingSchema);
module.exports = BookingProcessing;

