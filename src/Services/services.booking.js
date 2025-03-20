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

module.exports = {
	createBookingServices,
	getBookingByIdService,
	getCoachBookingHistoryServices,
	getUserBookingHistoryServices,
	getCoachBookingsByDateServices
}
