const mongoose = require('mongoose');

const LockSlotSchema = new mongoose.Schema(
	{
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
		lockedUntil: {
			type: Date,
			require: true,
			default: () => new Date(Date.now() + 10 * 60 * 1000)
		}
	}

);

LockSlotSchema.index({ lockedUntil: 1 }, { expireAfterSeconds: 0 });
LockSlotSchema.index({ coachId: 1, startTime: 1, endTime: 1 })
//update expireAfterSeconds to modify when this will be deleted



const LockSlotModel = mongoose.model('LockSlot', LockSlotSchema);
module.exports = LockSlotModel;
