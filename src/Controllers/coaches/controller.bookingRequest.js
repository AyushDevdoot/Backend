const { coachWeeklyAvailableSlotServices, getCoachBookingRequestServices, updateBookingStatusService } = require("../../Services/services.booking");
const { createLockServices, isLockedService } = require("../../Services/servcies.lockSlot");
const { sendResponse } = require("../../Helpers/helpers.commonFunc");
const {  getAppointmentsByCoachIdDto, updateBookingRequestDto, validateBookingRequestDto } = require('../../DTOs/booking.dto');

const getBookingRequestController = async (req, res) => {
	// get all user bookings for action 
	// coachId,  filtered with all the open for action bookings
	try {
		const { coachId } = getAppointmentsByCoachIdDto({ coachId: req.user });
		const result = await getCoachBookingRequestServices() 
		sendResponse(res, null, 201, true, 'successful',result);
	}catch (err) {
		console.error(err);
		sendResponse(res, err, 500);
	}

};



const updateBookingRequestController = async (req, res) => {
	//update -> confirm , reject or reschedule, reason, bookingId
	try {
		const data = updateBookingRequestDto(req.body);
		const errors = validateBookingRequestDto(data);
		if (Object.keys(errors).length > 0){
			sendResponse(res, null, 400, false, errors);
			return
		}

		let result = await updateBookingStatusService(data.bookingId, data.status);

		sendResponse(res, null, 201, true, 'successful', result);
	}catch (err) {
		console.error(err);
		sendResponse(res, err, 500);
	}
	return
};


module.exports = {
	getBookingRequestController,
	updateBookingRequestController,
};
