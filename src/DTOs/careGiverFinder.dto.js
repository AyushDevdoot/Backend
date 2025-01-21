const createChildCareGiverFinderDto = (data) => {
    const {
        careGiverType,
        childDetails,
        careLocation,
        careTime,
        name,
        email,
        mobile,
        specialNotes,
    } = data;

    return {
        careGiverType,
        childDetails,
        careLocation,
        careTime,
        name,
        email,
        mobile,
        specialNotes,
    };
};


function validateChildCareGiverFinderFields(data) {
    const errors = {};

    // careGiverType validation
    if (!data.careGiverType || !["nannies", "onetimesitter", "daycare"].includes(data.careGiverType)) {
        errors.careGiverType = "careGiverType must be one of 'nannies', 'onetimesitter', or 'daycare'.";
    }

    // childDetails validation
    if (!Array.isArray(data.childDetails) || data.childDetails.length === 0 || !data.childDetails.every(item => typeof item === 'string')) {
        errors.childDetails = "childDetails must be an array of strings and cannot be empty.";
    }

    // careLocation validation
    if (!data.careLocation || typeof data.careLocation !== 'string' || data.careLocation.trim().length < 2) {
        errors.careLocation = "careLocation must be at least 2 characters long and a valid string.";
    }

    // careTime validation
    if (!data.careTime || !["rightnow", "withinaweek", "in2months", "justbrowsing"].includes(data.careTime)) {
        errors.careTime = "careTime must be one of 'rightnow', 'withinaweek', 'in2months', or 'justbrowsing'.";
    }

    // name validation
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
        errors.name = "name must be at least 2 characters long and a valid string.";
    }

    // email validation
    if (!data.email || typeof data.email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = "email must be a valid email address.";
    }

    // mobile validation
    if (!data.mobile || typeof data.mobile !== 'string' || !/^\d+$/.test(data.mobile)) {
        errors.mobile = "mobile must be a valid string of digits.";
    }

    return errors;
}


module.exports = {
    createChildCareGiverFinderDto,
    validateChildCareGiverFinderFields,
};
