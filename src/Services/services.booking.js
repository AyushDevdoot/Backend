const bookingModel = require("../Models/models.booking");

const createBookingServices = async (booking) => {
	return await bookingModel(booking).save();
};

const getBookingByIdService = async ( _id ) => {
	return await bookingModel.findOne(_id) 

};

const getCoachBookingHistoryServices = async (coachId) => {
	// get all bookings of the coach, will be used for history
	return await CoachAvailabilityModel.find(coachId);
}


const getCoachBookingsByDateServices = async (coachId, startTime, endTime) => {
	return await CoachAvailabilityModel.find({ 
		coachId,
		startTime: {$gte: startTime},
		endTime: {$lte: endTime},
	});
}

const getUserBookingHistoryServices = async (userId) => {
	return await CoachAvailabilityModel.findOne(userId)
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

module.exports = {
	createBookingServices,
	getBookingByIdService,
	getCoachBookingHistoryServices,
	getUserBookingHistoryServices,
	getCoachBookingsByDateServices,
	updateBookingServices,
	updatePaymentStatusBookingServices
}
