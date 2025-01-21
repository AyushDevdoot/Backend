const createTutoringCareGiverFinderDto = (data) => {
    const {
        tutorLevelRequired,
        subject,
        tutoringPreference,
        userDescription,
        careLocation,
        careTime,
        name,
        email,
        mobile,
    } = data;

    return {
        tutorLevelRequired,
        subject,
        tutoringPreference,
        userDescription,
        careLocation,
        careTime,
        name,
        email,
        mobile,
    };
};

function validateTutoringCareGiverFinderFields(data) {
    const errors = {};

    // tutorLevelRequired validation
    if (!data.tutorLevelRequired || !["adult", "college", "highschool", "middleschool", "elementaryschool"].includes(data.tutorLevelRequired)) {
        errors.tutorLevelRequired = "tutorLevelRequired must be one of 'adult', 'college', 'highschool', 'middleschool', or 'elementaryschool'.";
    }

    // subject validation
    if (!Array.isArray(data.subject) || data.subject.length === 0) {
        errors.subject = "subject must be a non-empty array.";
    } else {
        const validSubjects = ["art", "business", "computers", "dance", "other"];
        const invalidSubjects = data.subject.filter((sub) => !validSubjects.includes(sub));
        if (invalidSubjects.length > 0) {
            errors.subject = `subject contains invalid values: ${invalidSubjects.join(", ")}.`;
        }
    }

    // tutoringPreference validation
    if (!data.tutoringPreference || !["online", "in-person", "either"].includes(data.tutoringPreference)) {
        errors.tutoringPreference = "tutoringPreference must be one of 'online', 'in-person', or 'either'.";
    }

    // userDescription validation
    if (!data.userDescription || !["independent", "needs-monitoring", "requiring-supervision", "not-sure"].includes(data.userDescription)) {
        errors.userDescription = "userDescription must be one of 'independent', 'needs-monitoring', 'requiring-supervision', or 'not-sure'.";
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
    createTutoringCareGiverFinderDto,
    validateTutoringCareGiverFinderFields,
};

