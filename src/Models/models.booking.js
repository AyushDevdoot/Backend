const mongoose = require('mongoose');

//time in UTC
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
		startTime: {
			type: Date,
			required: true,
		},
		endTime: {
			type: Date,
			required: true,
		},
		status: {
			type: String,
			enum: ['pending', 'confirmed', 'rescheduled', 'rejected', 'canceled', 'completed', 'timed-out', 'reschedule-request'], 
			default: 'pending', 
		},
		auditHistory: [
			{
				status: {
					type: String,
					enum: ['rescheduled', 'pending', 'confirmed' ], // audit history if user canceles it should show cancel, if confirms then confirm no return after confirm or cancel
				},
				StartTime: {
					type: Date,
					required: true,
				},
				endTime: {
					type: Date,
					required: true,
				},
				paymentStatus: {
					type: Boolean,
					default: false,
				},
				updatedAt: {
					type: Date,
					default: Date.now,
				},
				updatedBy: {
					type: String,
					enum: ['user', 'coach', 'system'],
				},
			},
		],
		description: {
			type: String,
			maxlength: 500,
		},

		paymentStatus: {
			type: Boolean,
			default: false,
		},
		updatedBy: {
			type: String,
			enum: ['user', 'coach', 'system'],
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
