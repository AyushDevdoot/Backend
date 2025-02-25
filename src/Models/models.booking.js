const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'userinfo', // Reference to the User who made the booking
      required: true,
    },
    coachId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'coachinfo', // Reference to the Coach the booking is made with
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['pending', 'confirmed', 'rescheduled', 'rejected', 'canceled', 'completed'], 
      default: 'pending', 
    },
    auditHistory: [
      {
        status: {
          type: String,
          enum: ['rescheduled'], // audit history if user canceles it should show cancel, if confirms then confirm no return after confirm or cancel
        },
        time: {
          type: Date,
          required: true,
        },
        updatedAt: {
          type: Date,
          default: Date.now,
        },
        updatedBy: {
          type: String,
          enum: ['userinfo', 'coach'],
        },
      },
    ],
    description: {
      type: String,
      maxlength: 500,
    },
    updatedBy: {
      type: String,
      enum: ['userinfo', 'coach'],
      required: true,
    },
  },
    {
      timestamps: true, // Automatically tracks createdAt and updatedAt
    },
);

// Indexing for performance improvement
bookingSchema.index({ userId: 1 });
bookingSchema.index({ coachId: 1 });
bookingSchema.index({ time: 1 });

// Adding pre-save validation to prevent double-booking for the same coach at the same time
bookingSchema.pre('save', async function (next) {
  const existingBooking = await mongoose.model('Booking').findOne({
    coachId: this.coachId,
    time: this.time,
    status: { $in: ['confirmed', 'pending'] }, // Check only for confirmed or pending bookings
  });

  if (existingBooking) {
    const error = new Error('This time slot is already booked for the selected coach.');
    return next(error);
  }

  next();
});

    // Creating the Booking model
    const Booking = mongoose.model('Booking', bookingSchema);
    module.exports = Booking;
