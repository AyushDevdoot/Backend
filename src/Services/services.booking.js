const CoachInfoModel = require("../Models/models.coachInfo");
const bookingModel = require("../Models/models.booking");
const CoachAvailabilityModel = require('../Models/models.coachAvailability');

const createBookingServices = async (booking) => {
	return await bookingModel(booking).save();
};

const getBookingByIdService = async ( _id ) => {
	return await bookingModel.findOne(_id) 

};

const getCoachBookingHistoryServices = async (coachId) => {
	// get all bookings of the coach, will be used for history
	return await bookingModel.find(coachId);
}

const getCoachBookingRequestServices = async (coachId) => {
	// get all bookings of the coach, that need action 
	return await bookingModel.find({
  		coachId: coachId,
  		status: 'pending',
  		paymentStatus: { $nin: ['failed', 'pending'] }
	});
}

const updateBookingStatusService = async (bookingId, status) => {
  // Update booking by _id and set a new status
	return await bookingModel.findByIdAndUpdate(
		bookingId,
    		{ status: status },
    		{ new: true } // Return the updated document
  	);
};


const getCoachBookingsByDateServices = async (coachId, startTime, endTime) => {
	return await bookingModel.find({ 
		coachId,
		startTime: {$gte: startTime},
		endTime: {$lte: endTime},
	});
}

const getUserBookingHistoryServices = async (userId) => {
	return await bookingModel.findOne(userId)
}

const updatePaymentStatusBookingServices = async (_id, paymentStatus) => {
	const updateObj = {
		$set: {
			paymentStatus: paymentStatus === 'rejected'? 'rejected': paymentStatus,
			updatedBy: 'user',
		},
	}

	if (paymentStatus === 'failed'){
		updateObj = 'canceled';
	}
	return await bookingModel.updateOne({ _id: _id }, updateObj);
};

const updateBookingServices = async (updateData) =>{
	const booking = await bookingModel.findOne(_id);
	const oldAuditData = {
		status: booking.status,
		startTime: booking.startTime,
		endTime: booking.endTime,
		paymentStatus: booking.paymentStatus,
		updatedBy: booking.updatedBy,
		updatedAt: booking.updatedAt
	}
	booking.auditHistory.push(oldAuditData);
	for (const key in updateData){
		if (updateData.hasOwnProperty(key)){
			booking[key] = updateData[key]
		}
	}
	return await booking.save();
}


const coachWeeklyAvailableSlotServices = async ({ coachId, startDate, endDate }) => {
	try{
		const start =  new Date(startDate);
		const end = new Date(endDate);

		const bookedQuery = bookingModel.findAll({
			coachId,
			startDate: { $gte: start },
			endDate: { $lte: end },
			status: { $in: ['pending', 'confirmed', 'rescheduled', 'reschedule-request']}
		}).exec();
		const availableQuery = CoachAvailabilityModel.findAll({ coachId, isAvailable: true }).exec();
		const coachInfo = CoachInfoModel.findOne({ _id: coachId }).select('timezone', 'sessionTime').exec(); 
		const [bookedSlots, availability] = await Promise.all([bookedQuery, coachInfo, availableQuery]);

		return { bookedSlots, coachInfo, availability };
	}catch (err){
		console.error(`Error in coachWeeklyAvailableSlotService`);
		throw err;
	}
};


const updateBookingServices = async ({bookingId, paymentId}) =>{
	return await bookingModel.updateOne({_id: bookingId}, { $set: { paymentStatus: paymentId }});
}

module.exports = {
	createBookingServices,
	getBookingByIdService,
	getCoachBookingHistoryServices,
	getUserBookingHistoryServices,
	getCoachBookingsByDateServices,
	updateBookingServices,
	updatePaymentStatusBookingServices,
	coachWeeklyAvailableSlotServices,
	getCoachBookingRequestServices,
	updateBookingStatusService
}
