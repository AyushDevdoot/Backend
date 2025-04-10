const { createCoachAvailabilityServices, getCoachAllAvailabilityServices, getCoachAvailabilityOfDayServices, updateCoachAvailabilityOfDayServices} = require("../../Services/services.coachAvailability");
const { coachWeeklyAvailableSlotServices } = require("../../Services/services.booking");
const { sendResponse } = require("../../Helpers/helpers.commonFunc");
const { generateTimeSlots } = require("../../Helpers/helpers.generateSlots");
const { getCoachWeeklyAvailableSlotDto, validateCoachWeeklyAvailableSlot } = require('../../DTOs/coachAvailability.dto');

const getCoachWeeklyAvailableSlotController = async (req, res) => {
	// get coach available slots for booking
	// time here is in utc only in front end will the time be in timezone
	try {
		// req -> coachId, startDate (utc), endDate (utc).
		const data = getCoachWeeklyAvailableSlotDto(req.body);
		const error = validateCoachWeeklyAvailableSlot(data);
		if (Object.keys(errors).length > 0){
			sendResponse(res, null, 400, false, errors);
			return
		}
		const { bookedSlots, coachInfo, availability } = await coachWeeklyAvailableSlotServices(data);
			
		const result = generateTimeSlots(data.start, data.end, coachInfo, availability, bookedSlots);
		sendResponse(res, null, 201, true, 'successful',result);
	}catch (err) {
		console.error(err);
		sendResponse(res, err, 500);
	}

};



const initializeBookingController = async (req, res) => {
	// get initialize the booking so client start transaction
	// time here is in utc only in frontend will send the time in iso utc
	// coachId, UserId, start and end time, description, updatedBy wille be userId; 
	try {
		// req -> coachId, startDate (utc), endDate (utc).
		const data = getCoachWeeklyAvailableSlotDto(req.body);
		const error = validateCoachWeeklyAvailableSlot(data);
		if (Object.keys(errors).length > 0){
			sendResponse(res, null, 400, false, errors);
			return
		}
		const { bookedSlots, coachInfo, availability } = await coachWeeklyAvailableSlotServices(data);
			
		const result = generateTimeSlots(data.start, data.end, coachInfo, availability, bookedSlots);
		sendResponse(res, null, 201, true, 'successful',result);
	}catch (err) {
		console.error(err);
		sendResponse(res, err, 500);
	}

};



module.exports = {
	addCoachAvailabilityController,
	getCoachAllAvailabilityController,
	updateCoachAvailabilityController,
};
