
const createCoachTimeslotDto = (data) => {
    const {
        coachId,
        slot,

    } = data;

    return {
        coachId,
        slot,

    };
};


function validateCoachTimeslotFields(data) {
    const errors = {};

    // coachId validation
    if (!data.coachId || typeof data.coachId !== 'string' || data.coachId.trim().length < 2) {
        errors.coachId = "coachId must be a valid string and at least 2 characters long.";
    }

    // slot validation
    if (!data.slot || typeof data.slot !== 'object') {
        errors.slot = "slot must be a valid object.";
    }



    return errors;
}

module.exports = {
    createCoachTimeslotDto,
    validateCoachTimeslotFields,
};
