const { parse, isValid, format } = require('date-fns');
const { isValidObjectId } = require('../Helpers/helpers.commonFunc');
const moment = require('moment-timezone');


const validStatus = new Set(['pending', 'confirmed', 'rescheduled', 'rejected', 'canceled', 'completed', 'timed-out', 'reschedule-request'])
const valideUser = new Set(['user', 'coach', 'system'])


function hour_24_format(time) {
	// also converts it to utc
    // First, try parsing the time in 12-hour format (e.g., '9:00 AM')
    const parsed12HrTime = parse(time, 'h:mm a', new Date());
    
    // If parsing the 12-hour format is successful
    if (isValid(parsed12HrTime)) {
        // Convert to 24-hour format (HH:mm) and attach current date
        return format(parsed12HrTime, 'yyyy-MM-dd HH:mm');
    }

    // If it's already a 24-hour format time, try parsing it directly
    const parsed24HrTime = parse(time, 'HH:mm', new Date());
    
    // If the 24-hour format parsing is valid, return the time with the current date
    if (isValid(parsed24HrTime)) {
        return format(parsed24HrTime, 'yyyy-MM-dd HH:mm');
    }

    return null;
}

function isValidTime(time) {
    // Check if the time is in valid 24-hour format (HH:mm)
    const parsed24Hr = parse(time, 'HH:mm', new Date());
    if (isValid(parsed24Hr)) {
        return true; // Valid 24-hour time
    }

    // Check if the time is in valid 12-hour format (h:mm a)
    const parsed12Hr = parse(time, 'h:mm a', new Date());
    if (isValid(parsed12Hr)) {
        return true; // Valid 12-hour time
    }

    // If neither format is valid, return false
    return false;
}

const createBookingDto = (data) => {
  const {
    coachId,
    userId,
    startTime,
    endTime,
    timeZone,
    description,
    status = 'pending',
    updatedBy = 'user',
    paymentStatus
  } = data;

  return {
    coachId,
    userId,
    startTime: hour_24_format(startTime), // Convert start time to 24-hour format with date
    endTime: hour_24_format(endTime),     // Convert end time to 24-hour format with date
    timeZone,
    description,
    status,
    updatedBy,
    paymentStatus: paymentStatus === undefined ? false : paymentStatus,
  };
};

function validateCreateBookingDto(data) {
	const errors = {};

	// Validate coachId
	if (!data.coachId || typeof data.coachId !== 'string' || data.coachId.length !== 24) {
		errors.coachId = "coachId must be a valid ObjectId string.";
	}

	// Validate userId
	if (!data.userId || typeof data.userId !== 'string' || data.userId.length !== 24) {
		errors.userId = "userId must be a valid ObjectId string.";
	}

	// Validate startTime format
	if (!data.startTime || typeof data.startTime !== 'string' || !isValidTime(data.startTime)) {
		errors.startTime = "startTime must be in the format 'HH:MM AM/PM' or 'HH:MM'.";
	}

	// Validate description
	if (data.description && typeof data.description !== 'string') {
		errors.description = "Description should be a string.";
	}

	// Validate endTime format
	if (!data.endTime || typeof data.endTime !== 'string' || !isValidTime(data.endTime)) {
		errors.endTime = "endTime must be in the format 'HH:MM AM/PM' or 'HH:MM'.";
	}

	// Validate paymentStatus
	if (typeof data.paymentStatus !== 'boolean') {
		errors.paymentStatus = "paymentStatus should be a boolean.";
	}

	return errors;
}


const getAppointmentsByCoachIdDto = (data) => {
	const {
		coachId,
	} = data;

	return {
		coachId,
	};
};

const getAppointmentByIdDto = (data) => {
	const { id } = data;
	return { _id: id }
};


const getAppointmentsByUserIdDto = (data) => {
	const {
		userId,
	} = data;

	return {
		userId,
	};
};


const validateGetCoachAppointmentsDto = (data) => {
	let errors = {};

	if (!data.coachId || typeof data.coachId !== 'string' || !isValidObjectId(data.coachId)) {
		errors.coachId = "coachId must be a valid ObjectId string.";
	}

	return errors

};

const validateGetUserAppointmentsDto = (data) => {
	let errors = {};

	if (!data.userId || typeof data.userId !== 'string' || !isValidObjectId(data.userId)) {
		errors.userId = "coachId must be a valid ObjectId string.";
	}

	return errors

};



const updateCoachAvailabilityDto = (data) => {
	const {
		id,
		coachId,
		day,
		startTime,
		endTime,
		isAvailable,
	} = data;

	return {
		id,
		coachId,
		day,
		startTime,
		endTime,
		isAvailable
	};
};


const vaildateUpdateCoachAvailabilityDto = (data) =>{
	const errors = {};
	const vaildDays = { 'Monday': 1, 'Tuesday': 1, 'Wednesday': 1, 'Thursday': 1, 'Friday': 1, 'Saturday': 1, 'Sunday': 1 };

	if (data.id || (data.coachId && data.day)){
		errors.id = "coachId and day  or id is needed !";
	}
	// coachId validation
	if (!data.coachId || typeof data.coachId !== 'string' || !data.coachId.match(/^[a-f\d]{24}$/i)) {
		errors.coachId = "coachId must be a valid ObjectId string.";
	}

	// date validation
	if (!data.day || typeof data.day !== 'string' || !vaildDays[data.day]) {
		errors.day = "day must be a valid Day.";
	}

	// time validation (new format: "HH:MM AM/PM - HH:MM AM/PM")
	if (
		!data.startTime ||
		typeof data.startTime !== 'string' ||
		!isValidTime(data.startTime)
	) {
		errors.startTime = "startTime must be in the format 'HH:MM AM/PM - HH:MM AM/PM'.";
	}


	if (
		!data.endTime ||
		typeof data.endTime !== 'string' ||
		!isValidTime(data.endTime)
	) {
		errors.endTime = "endtime must be in the format 'HH:MM AM/PM - HH:MM AM/PM'.";
	}

	if (! typeof data.isAvailable === 'boolean'){
		errors.isAvailable = "Availability should be a boolean";
	}

	return errors;
}


const updateStatusDto = (data) => {
	const {
		id,
		coachId,
		userId,
		paymentStatus,
		startTime,
		endTime,
		status,
		updatedBy,
		isPaid,
	} = data;

	return {
		id,
		coachId,
		userId,
		paymentStatus,
		startTime :hour_24_format(startTime),
		endTime :hour_24_format(endTime),
		status,
		updatedBy,
		isPaid
	};
};


const ValidateStatusDto = (data) => {
	const errors = {};

	if (data.id || !isValidObjectId(id)){
		errors.id = "coachId and day  or id is needed !";
	}
	// coachId validation
	if (!data.userId || typeof data.userId !== 'string' || !isValidObjectId(data.userId)) {
		errors.userId = "userId must be a valid ObjectId string.";
	}

	if (!data.paymentStatus || !typeof data.paymentStatus === 'string'){
		errors.paymentStatus = "payment Status not availale";
	}

	if (data.startTime|| !typeof data.startTime || !isValidTime(data.startTime)){
		errors.startTime = "startTime error invalid format"
	}

	if (data.endTime || !isValidTime(data.endTime)){
		errors.endTime = "invalid endTime format";

	}

	if (data.coachId || !typeof data.coachId !== 'string' || !isValidObjectId(data.coachId) ){
		errors.coachId = 'invalid coachId';

	}

	if (data.status || !typeof data.status !== 'string' || data.status in validStatus){
		errors.status = 'invalid Status';

	}

	if (data.updateBy || !typeof data.updateBy !== 'string' || data.updatedBy in valideUser){
		errors.updatedBy = 'invalide updatedBy data';
	}
	if (data.isPaid || !typeof data.isPaid !== 'boolean'){
		errors.isPaid = ' invalid isPaid param expected boolean';
	}

	return errors;
};



module.exports = {
	createBookingDto,
	validateCreateBookingDto,
	getAppointmentsByCoachIdDto,
	updateCoachAvailabilityDto,
	vaildateUpdateCoachAvailabilityDto,
	validateGetCoachAppointmentsDto,
    	validateGetUserAppointmentsDto,
    	getAppointmentsByUserIdDto,
	updateStatusDto,
	ValidateStatusDto
};

