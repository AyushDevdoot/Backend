const { parse, isValid, format } = require('date-fns');
const { isValidObjectId } = require('../Helpers/helpers.commonFunc');


function hour_24_format(time) {

    // Try to parse the time string in the format 'h:mm a' (e.g. '9:00 AM')
    const parsedTime = parse(time, 'h:mm a', new Date());
	if (isNaN(parsedTime)){
		return '';
	}
    // Check if the parsed time is valid
	return format(parsedTime, 'HH:mm');
}

function isValidTime(time) {
	const time24 = parse(time, 'HH:mm', new Date());
    
    if (isValid(time24)) {
        return true; // Valid 24-hour time
    }

    // Try parsing the time for 12-hour format 'h:mm a' (e.g., '9:00 AM')
    const time12 = parse(time, 'h:mm a', new Date());

    if (isValid(time12)) {
        return true; // Valid 12-hour time
    }

    // If neither format is valid, return false
    return false;
}


const createCoachAvailabilityDto = (data) => {
	const {
		coachId,
		day,
		startTime,
		endTime,
		isAvailable,
	} = data;

	return {
		coachId,
		day,
		startTime: hour_24_format(startTime),
		endTime: hour_24_format(endTime),
		isAvailable: isAvailable === undefined || isAvailable? true : false,
	};
};


function validateCoachAvailability(data) {
	const errors = {};
	const vaildDays = { 'Monday': 1, 'Tuesday': 1, 'Wednesday': 1, 'Thursday': 1, 'Friday': 1, 'Saturday': 1, 'Sunday': 1 };

	// coachId validation
	if (!data.coachId || typeof data.coachId !== 'string' || !isValidObjectId(coachId)) {
		console.log(data.coachId)
		errors.coachId = "coachId must be a valid ObjectId string.";
	}

	// date validation
	if (!data.day || typeof data.day !== 'string' || !vaildDays[data.day]) {
		errors.day = "day must be a valid Day.";
	}
	
	console.log(data.startTime, isValidTime(data.startTime));
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
		errors.endTime = "endtime must be in the format 'HH:MM AM/PM OR HH:MM'.";
	}

	if (! typeof data.isAvailable === 'boolean'){
		errors.isAvailable = "Availability should be a boolean";
	}

	return errors;
}


const getCoachAvailabilityDto = (data) => {
	const {
		coachId,
	} = data;

	return {
		coachId,
	};
};

const validateGetCoachAvailabilityDto = (data) => {
	let errors = {};

	if (!data.coachId || typeof data.coachId !== 'string' || !isValidObjectId(coachId)) {
		errors.coachId = "coachId must be a valid ObjectId string.";
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
	if (!data.coachId || typeof data.coachId !== 'string' || !isValidObjectId(coachId)) {
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


module.exports = {
	createCoachAvailabilityDto,
	validateCoachAvailability,
	getCoachAvailabilityDto,
	updateCoachAvailabilityDto,
	vaildateUpdateCoachAvailabilityDto,
	validateGetCoachAvailabilityDto
};

