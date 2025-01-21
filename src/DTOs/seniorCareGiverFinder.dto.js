const createSeniorCareGiverFinderDto = (data) => {
    const {
        seniorCareType,
        seniorCareNeededFor,
        age,
        serviceRequired,
        careLocation,
        careTime,
        name,
        email,
        mobile,
        specialNotes,
    } = data;

    return {
        seniorCareType,
        seniorCareNeededFor,
        age,
        serviceRequired,
        careLocation,
        careTime,
        name,
        email,
        mobile,
        specialNotes,
    };
};

function validateSeniorCareGiverFinderFields(data) {
    const errors = {};

    // seniorCareType validation
    if (!data.seniorCareType || !["in-home", "senior", "not-sure"].includes(data.seniorCareType)) {
        errors.seniorCareType = "seniorCareType must be one of 'in-home', 'senior', or 'not-sure'.";
    }

    // seniorCareNeededFor validation
    if (!data.seniorCareNeededFor || !["parents", "myself", "spouse", "other"].includes(data.seniorCareNeededFor)) {
        errors.seniorCareNeededFor = "seniorCareNeededFor must be one of 'parents', 'myself', 'spouse', or 'other'.";
    }

    // age validation
    if (typeof data.age !== "string" || data.age <= 0) {
        errors.age = "age must be a valid string.";
    }

    // serviceRequired validation
    if (!Array.isArray(data.serviceRequired) || data.serviceRequired.length === 0) {
        errors.serviceRequired = "serviceRequired must be a non-empty array.";
    } else {
        const validServices = ["everyday", "personalcare", "companionship", "mobility", "memorycare", "newtechnology"];
        const invalidServices = data.serviceRequired.filter((service) => !validServices.includes(service));
        if (invalidServices.length > 0) {
            errors.serviceRequired = `serviceRequired contains invalid values: ${invalidServices.join(", ")}.`;
        }
    }

    // careLocation validation
    if (!data.careLocation || typeof data.careLocation !== "string" || data.careLocation.trim().length < 2) {
        errors.careLocation = "careLocation must be a valid string with at least 2 characters.";
    }

    // careTime validation
    if (!data.careTime || !["rightnow", "withinaweek", "in2months", "justbrowsing"].includes(data.careTime)) {
        errors.careTime = "careTime must be one of 'rightnow', 'withinaweek', 'in2months', or 'justbrowsing'.";
    }

    // name validation
    if (!data.name || typeof data.name !== "string" || data.name.trim().length < 2) {
        errors.name = "name must be a valid string with at least 2 characters.";
    }

    // email validation
    if (!data.email || typeof data.email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = "email must be a valid email address.";
    }

    // mobile validation
    if (!data.mobile || typeof data.mobile !== "string" || !/^\d+$/.test(data.mobile)) {
        errors.mobile = "mobile must be a valid string of digits.";
    }


    return errors;
}


module.exports = {
    createSeniorCareGiverFinderDto,
    validateSeniorCareGiverFinderFields,
};
