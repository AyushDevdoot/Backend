const BookingProcessing = require('../Models/models.bookingProcessing')

const acquireBookingLock = async (bookingId, coachId, startTime, endTime) => {
    const currentTime = new Date();

    const bookingLock = await BookingProcessing.findOneAndUpdate(
        {
            bookingId: bookingId,
            coachId: coachId,
            startTime: startTime,
            endTime: endTime,
            lockTimestamp: { $exists: false },  // Lock does not exist
        },
        {
            $set: { lockTimestamp: currentTime },  // Set the lock timestamp
        },
        { new: true, upsert: true }  // Create a new document if no lock exists
    );
    if (!bookingLock) {
        return false;
    }
    return true;
};

// Service to release the lock on a time slot
const releaseBookingLock = async (bookingId, coachId, startTime, endTime) => {
    const bookingLock = await BookingProcessing.findOneAndUpdate(
        { bookingId: bookingId, coachId: coachId, startTime: startTime, endTime: endTime },
        { $unset: { lockTimestamp: 1 } },  // Remove the lockTimestamp
        { new: true }
    );

    if (bookingLock) {
        console.log(`Lock released for booking ${bookingId} with coach ${coachId}`);
        return true;
    } else {
        console.log(`No lock found to release for booking ${bookingId}`);
        return false;
    }
};


// Service to remove the lock data 
const removeFromBookingProcess = async (bookingId, coachId, startTime, endTime) => {
    return await BookingProcessing.deleteOne(
        { bookingId: bookingId, coachId: coachId, startTime: startTime, endTime: endTime }
    );
};

// Service to check if the lock exists for a time slot
const isBookingLocked = async (coachId, startTime) => {
    const bookingLock = await BookingProcessing.findOne(
        { coachId: coachId, startTime: startTime }
    );

    return bookingLock ? true : false;
};

module.exports = {
    acquireBookingLock,
    releaseBookingLock,
    isBookingLocked,
    removeFromBookingProcess
};

