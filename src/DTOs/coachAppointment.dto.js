const createCoachAppointmentDto = (data) => {
    const {
        coachId,
        date,
        time
    } = data;

    return {
        coachId,
        date,
        time
    };
};


function validateCoachAppointmentFields(data) {
    const errors = {};

    // coachId validation
    if (!data.coachId || typeof data.coachId !== 'string' || !data.coachId.match(/^[a-f\d]{24}$/i)) {
        errors.coachId = "coachId must be a valid ObjectId string.";
    }

    // date validation
    if (!data.date || typeof data.date !== 'string' || !data.date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        errors.date = "date must be a valid string in the format YYYY-MM-DD.";
    }

    // time validation (new format: "HH:MM AM/PM - HH:MM AM/PM")
    if (
        !data.time ||
        typeof data.time !== 'string' ||
        !data.time.match(/^([0-1]?\d|2[0-3]):[0-5]\d (AM|PM) - ([0-1]?\d|2[0-3]):[0-5]\d (AM|PM)$/)
    ) {
        errors.time = "time must be in the format 'HH:MM AM/PM - HH:MM AM/PM'.";
    }


    return errors;
}

module.exports = {
    createCoachAppointmentDto,
    validateCoachAppointmentFields,
};

