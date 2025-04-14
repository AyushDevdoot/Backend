const { coachWeeklyAvailableSlotServices, resolveBookingServices, createBookingServices } = require("../../Services/services.booking");
const { createLockServices, isLockedService } = require("../../Services/servcies.lockSlot");
const { sendResponse } = require("../../Helpers/helpers.commonFunc");
const { generateTimeSlots } = require("../../Helpers/helpers.generateSlots");
const { getCoachWeeklyAvailableSlotDto, validateCoachWeeklyAvailableSlot, initializeBookingDto, validateInitializeBooking, resolveBookingDto, validateResolveBooking } = require('../../DTOs/booking.dto');

const getCoachWeeklyAvailableSlotController = async (req, res) => {
	// get coach available slots for booking
	// time here is in utc only in front end will the time be in timezone
	try {
		console.log(req.query)
		// req -> coachId, startDate (utc), endDate (utc).
		const data = getCoachWeeklyAvailableSlotDto(req.query);
		const errors = validateCoachWeeklyAvailableSlot(data);
		if (Object.keys(errors).length > 0){
			sendResponse(res, null, 400, false, errors);
			return
		}
		console.log(data);
		const { bookedSlots, coachInfo, availability } = await coachWeeklyAvailableSlotServices(data);
		console.log(bookedSlots, coachInfo, availability);	
		const result = generateTimeSlots(data.startDate, data.endDate, coachInfo, availability, bookedSlots);
		sendResponse(res, null, 201, true, 'successful',result);
	}catch (err) {
		console.error(err);
		sendResponse(res, err, 500);
	}

};



const initializeBookingController = async (req, res) => {
	// get initialize the booking so client start transaction
	// time here is in utc only in frontend will send the time in iso utc
	// coachId, UserId, start and end time, description, updatedBy will be userId; 
	try {
		// req -> coachId, startDate (utc), endDate (utc).
		const data = initializeBookingDto(req.body);
		const errors = validateInitializeBooking(data);
		if (Object.keys(errors).length > 0){
			sendResponse(res, null, 400, false, errors);
			return
		}
		
		const islocked = await isLockedService({ 'coachId': data.coachId, 'startDate': data.startDate, 'endDate': data.endDate });
		console.log(islocked);
		if (islocked){
			sendResponse(res, null, 400, false, "Slot not Available!");
			return
		}

		const [lock, booking] = await Promise.all([
			createLockServices(data),
			createBookingServices(data)
		]);

		sendResponse(res, null, 201, true, 'successful',{lock, booking});
	}catch (err) {

		console.error(err);
		sendResponse(res, err, 500, false, err.message);
	}
};


const resolveBookingController = async (req, res) =>{
	// payment status update
	// failed
	// if frontend didnt update the response then ?
	try {
		const data = resolveBookingDto(req.body);
		const errors = validateResolveBooking(data);

		if (Object.keys(errors).length > 0){
			sendResponse(res, null, 400, false, errors);
			return
		}
		const result = await resolveBookingServices(data);
		sendResponse(res, null, 201, true, 'successfully Booked, waiting for response', result);
		return 
	}catch (err){
		console.error(err);
		sendResponse(res,err,500);
	}
}

module.exports = {
	getCoachWeeklyAvailableSlotController,
	initializeBookingController,
	resolveBookingController,
};
