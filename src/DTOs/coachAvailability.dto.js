const { parse, isValid, format } = require('date-fns');


function isValidTime(time) {
    // Try to parse the time string in the format 'h:mm a' (e.g. '9:00 AM')
    const parsedTime = parse(time, 'h:mm a', new Date());

    // Check if the parsed time is valid
    return isValid(parsedTime);
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
		startTime,
		endTime,
		isAvailable: isAvailable || true,
	};
};


function validateCoachAvailability(data) {
	const errors = {};
	const vaildDays = { 'Monday': 1, 'Tuesday': 1, 'Wednesday': 1, 'Thursday': 1, 'Friday': 1, 'Saturday': 1, 'Sunday': 1 };

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

	if (!data.coachId || typeof data.coachId !== 'string' || !data.coachId.match(/^[a-f\d]{24}$/i)) {
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
		! )
	) {
		errors.startTime = "startTime must be in the format 'HH:MM AM/PM - HH:MM AM/PM'.";
	}


	if (
		!data.endTime ||
		typeof data.endTime !== 'string' ||
		!data.endTime.match(/^([0-1]?\d|2[0-3]):[0-5]\d (AM|PM) - ([0-1]?\d|2[0-3]):[0-5]\d (AM|PM)$/)
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
	vaildateUpdateCoachAvailability,
	validateGetCoachAvailabilityDto
};

